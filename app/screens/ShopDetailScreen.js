import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {Container, AppText} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const {width, height} = SIZES; // screen width and height

const ShopDetailScreen = ({navigate, route}) => {
  const {shopId} = route.params;

  return (
    <Container style={styles.container}>
      <AppText>{shopId}</AppText>
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

export default ShopDetailScreen;
