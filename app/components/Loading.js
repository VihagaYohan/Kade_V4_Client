import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

// constants
import {SIZES, COLORS} from '../constants';

const {width, height} = SIZES;

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
