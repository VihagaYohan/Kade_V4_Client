import React, {Component} from 'react';
import {StyleSheet, View, Image, ImageBackground,Text} from 'react-native';

// components
import {Container} from '../../components';

const RegisterScreen = ({navigation, route}) => {
  return (
    <Container>
      <Text>Register Screen</Text>
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

export default RegisterScreen;
