import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// components
import {Container, AppText} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const ShopScreen = ({navigation, route}) => {
  return (
    <Container style={styles.container}>
      <AppText>Shop screen</AppText>
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

export default ShopScreen;
