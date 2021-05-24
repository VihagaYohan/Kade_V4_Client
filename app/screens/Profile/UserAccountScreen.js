import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// components
import {
  Container,
  Loading,
  HelperText,
  AppText,
  AppTextInput,
} from '../../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../../constants';

const {width, height} = SIZES; // device screen width and height

const UserAccountScreen = () => {
  return (
    <Container style={styles.container}>
      <AppText>Map screen</AppText>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserAccountScreen;
