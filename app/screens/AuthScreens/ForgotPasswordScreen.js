import React, {useState} from 'react';
import {StyleSheet, View, Image, ImageBackground, Text} from 'react-native';
import axios from 'axios';

// components
import {
  Container,
  AppTextInput,
  Icon,
  AppText,
  AppButton,
} from '../../components';

// constants
import {SIZES, COLORS, normalizeSize} from '../../constants';

// base URL
import baseURL from '../../api/baseURL';

const {width, height} = SIZES; // device screen width and height

const ForgotScreen = ({navigation, route}) => {
  const [email, setEmail] = useState();

  // reset password
  const passwordReset = async () => {
    if (email == undefined || null) {
      return alert('Please enter email address');
    }
    const result = await axios.post(baseURL + '/api/auth/forgotPassword', {
      email: email,
    });
    if (!resutl) {
      return alert('Please try again');
    }

    alert('Please check your email inbox');
  };

  return (
    <Container style={styles.container}>
      {/* header section - contains back icon and the title */}
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={normalizeSize(20)}
          color={COLORS.secondary}
          onPress={() => navigation.goBack()}
        />

        <AppText style={styles.title}>Forgot Password</AppText>
      </View>

      {/* content */}
      <View style={styles.contentContainer}>
        {/* forgot password field */}
        <View style={styles.emailFiledContainer}>
          <AppTextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textField}
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        {/* button */}
        <AppButton
          title="Reset Passsword"
          onPress={() => passwordReset()}
          style={styles.button}
          buttonTextStyles={styles.buttonText}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    paddingHorizontal: normalizeSize(10),
    backgroundColor: COLORS.gra3,
  },
  header: {
    flexDirection: 'row',
    marginVertical: normalizeSize(20),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(16),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailFiledContainer: {
    width: width - normalizeSize(20),
    height: width * 0.15,
    marginBottom: normalizeSize(20),
  },
  textField: {
    textAlign: 'center',
    borderColor: COLORS.black,
    fontSize: normalizeSize(14),
  },
  button: {
    width: '50%',
    height: width * 0.1,
  },
  buttonText: {
    fontSize: normalizeSize(14),
  },
});

export default ForgotScreen;
