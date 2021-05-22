import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {normalizeSize} from '../constants';

const AppText = ({children, style, ...otherProps}) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(12),
  },
});

export default AppText;
