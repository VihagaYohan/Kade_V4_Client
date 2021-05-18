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
} from 'react-native';
import {Formik} from 'formik';

// components
import {Container, AppTextInput} from '../../components';

// constants
import {COLORS, normalizeSize, SIZES} from '../../constants';
import {TextInput} from 'react-native-gesture-handler';

const WelcomeScreen = ({navigation, route}) => {
  const [email, setEmail] = useState(''); // sets email
  const [password, setPassword] = useState(''); // sets password
  const [visible, setVisible] = useState(false); // sets password visiblilty

  return (
    <Container style={styles.container}>
      {/* keyboar avaoiding view */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        {/* secion 1 - contains logo & tag line */}
        <View style={styles.section1}>
          {/* logo container */}
          <View style={styles.logoContainer}></View>
          {/* tag line */}
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Your Market Place</Text>
          </View>
        </View>

        {/* section 2 - contains login form and other options such as forgot password, sign up and login as guest */}
        <View style={styles.section2}>
          {/* login container - contains email, password and login button */}
          <View style={styles.loginContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={values => console.log(values)}>
              {({handleChange, handleSubmit}) => (
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
                    />
                  </View>

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
                    />
                  </View>

                  {/* login button */}
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => alert('login button pressed')}>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    borderWidth: 1,
  },
  mainContainer: {
    width: '96%',
    height: '98%',
    borderWidth: 1,
    backgroundColor: 'red',
  },
  // section 1 stylings
  section1: {
    width: '100%',
    height: '25%',
    backgroundColor: 'yellow',
  },
  logoContainer: {
    flex: 3,
    borderWidth: 1,
  },
  welcomeTextContainer: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(18),
    color: COLORS.secondary,
  },
  // section 2 styles
  section2: {
    width: '100%',
    height: '75%',
    backgroundColor: 'white',
  },
  loginContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    marginBottom: normalizeSize(20),
    borderRadius: normalizeSize(20),
    paddingHorizontal: normalizeSize(5),
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
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Light',
    fontSize: normalizeSize(16),
    color: COLORS.white,
  },
});

export default WelcomeScreen;
