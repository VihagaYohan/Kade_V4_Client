import React, {Component} from 'react';
import {StyleSheet, View, Image, ImageBackground, Text} from 'react-native';

// components
import {Container} from '../../components';

const LoginScreen = ({navigation, route}) => {
  return (
    <Container>
      <Text>Login Screen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
