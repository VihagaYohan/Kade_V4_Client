import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {AppText} from '../../components/';

// constants
import {COLORS, normalizeSize} from '../../constants';

const ErrorMessage = ({error, visible}) => {
  if (!visible || !error) return null;
  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: COLORS.red,
    marginBottom: normalizeSize(5),
  },
});

export default ErrorMessage;
