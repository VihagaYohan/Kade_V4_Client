import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

import {SIZES, COLORS} from '../constants/index';

const LoadingComponent = ({size, color}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;
