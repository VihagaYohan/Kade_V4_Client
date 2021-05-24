import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// componetns
import {Container, AppText, HelperText, Loading} from '../components/';

// constants
import {SIZES, normalizeSize, COLORS} from '../constants/';

const {width, height} = SIZES;

const OrderScreen = ({navigation, route}) => {
  const {userAddress} = route.params;

  return (
    <Container style={styles.container}>
      <AppText>Order screen</AppText>
      <AppText>{userAddress}</AppText>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderScreen;
