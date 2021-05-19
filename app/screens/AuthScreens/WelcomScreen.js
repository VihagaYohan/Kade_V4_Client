import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import {Container, AppTextInput, AppText, ErrorMessage} from '../../components';
import routes from '../../navigation/routes';

// constants
import {COLORS, normalizeSize, SIZES} from '../../constants';
import {TextInput} from 'react-native-gesture-handler';

// API
import authAPI from '../../api/auth';

// form validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('E-mail'),
  password: Yup.string().required().min(4).label('Password'),
});

const WelcomeScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false); // sets modal visiblilty

  // handle user login
  const handleLogin = async ({email, password}) => {
    // enable model
    setVisible(true);
    const result = await authAPI.login(email, password);
    if (result == null) setVisible(false);
    // check for errors
    if (!result.ok) {
      alert('Please check login credentials');
      setVisible(false); // disable model
      return;
    }

    // disable model
    setVisible(false);

    const data = result.data;
    const token = JSON.stringify(data.token);
    console.log(`token : ${token}`); // development purpose

    // saving login token on async-storage
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate(routes.App_Navigator);
  };

  return (
    <Container style={styles.container}>
      {/* keyboar avaoiding view */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        {/* secion 1 - contains logo */}
        <View style={styles.section1}>
          {/* logo container */}
          <View style={styles.logoContainer}></View>
        </View>

        {/* section 2 - contains login form and other options such as forgot password, sign up and login as guest */}
        <View style={styles.section2}>
          {/* login container - contains email, password and login button */}
          <View style={styles.loginContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={values => {
                handleLogin(values);
              }}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleSubmit,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <React.Fragment>
                  {/* email field */}
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={{
                        paddingVertical:
                          Platform.OS === 'ios' ? normalizeSize(15) : null,
                        fontFamily: 'Poppins-Medium',
                        fontSize: 14,
                        color: COLORS.secondary,
                        width: '100%',
                      }}
                      placeholder="Enter your email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                    />
                  </View>
                  <ErrorMessage error={errors.email} visible={touched.email} />

                  {/* password field */}
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={{
                        paddingVertical:
                          Platform.OS === 'ios' ? normalizeSize(15) : null,
                        fontFamily: 'Poppins-Medium',
                        fontSize: 14,
                        color: COLORS.secondary,
                        width: '100%',
                      }}
                      placeholder="Password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                      textContentType="password"
                      onChangeText={handleChange('password')}
                      onblue={() => setFieldTouched('password')}
                    />
                  </View>
                  <ErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />

                  {/* login button */}
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </Formik>

            {/* other options container. this contains gues login, sign-up and forgot password */}
            <View style={styles.otherOptionsContainer}>
              {/* continue as guest */}
              <View style={styles.guestLoginContainer}>
                <Text
                  style={styles.guestLogin}
                  onPress={() => navigation.navigate(routes.App_Navigator)}>
                  Continue as Guest
                </Text>
              </View>
            </View>

            {/* sign up */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpSection1}>Don't have an account?</Text>
              <Text
                style={styles.signUpSection2}
                onPress={() => alert('Sign up clicked')}>
                Sign up
              </Text>
            </View>

            {/* forgot password */}
            <View style={styles.forgotPasswordContainer}>
              <Text
                style={styles.forgotPassword}
                onPress={() => alert('forgot password clicked')}>
                Forgot Password ?
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Modal -  shows activity loader */}
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        style={{
          borderWidth: 1,
        }}>
        {/* wrraper view  component */}
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* inner-wrraper */}
          <View
            style={{
              width: normalizeSize(100),
              height: normalizeSize(100),
              backgroundColor: COLORS.secondary,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* activity indicator */}
            <ActivityIndicator animating color={COLORS.primary} size="large" />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
  },
  mainContainer: {
    width: '96%',
    height: '98%',
  },
  // section 1 stylings
  section1: {
    width: '100%',
    height: '25%',
  },
  logoContainer: {},

  welcomeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(18),
    color: COLORS.secondary,
  },
  // section 2 styles
  section2: {
    width: '100%',
    height: '75%',
  },
  loginContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: normalizeSize(20),
    paddingHorizontal: normalizeSize(5),
    marginBottom: normalizeSize(20),
    borderColor: COLORS.gray,
  },
  loginButton: {
    paddingHorizontal: normalizeSize(30),
    paddingVertical: normalizeSize(10),
    borderRadius: normalizeSize(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,

    // shadow properties for iOS
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: normalizeSize(5)},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,

    // shadow properties for android
    elevation: 10,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Light',
    fontSize: normalizeSize(16),
    color: COLORS.white,
  },
  otherOptionsContainer: {
    marginTop: normalizeSize(20),
  },
  guestLoginContainer: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  guestLogin: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.primary,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: normalizeSize(20),
  },
  signUpSection1: {
    marginRight: normalizeSize(10),
    color: COLORS.gray,
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
  },
  signUpSection2: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.primary,
  },
  forgotPasswordContainer: {
    marginTop: normalizeSize(20),
  },
  forgotPassword: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.primary,
  },
});

export default WelcomeScreen;
