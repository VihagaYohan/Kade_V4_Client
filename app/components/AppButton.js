import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

// components
import {AppText, Icon} from './index';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const {width, height} = SIZES; // device width and height

const AppButton = ({style, onPress, title, children, icon}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: normalizeSize(30),

    // shadow properties for iOS
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    // shadow properties for android
    elevation:10
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.white,
    fontSize: normalizeSize(18),
  },
});

export default AppButton;
