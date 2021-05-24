import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// componetns
import {Container, AppText, HelperText, Loading} from '../components/';

// constants
import {SIZES, normalizeSize, COLORS} from '../constants/';

const {width, height} = SIZES;

const OrderScreen = () => {
  return (
    <Container style={styles.container}>
      <AppText>Order screen</AppText>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderScreen;
