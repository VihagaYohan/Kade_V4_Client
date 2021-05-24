import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

// component
import {Icon} from '../components/';

// constants
import {SIZES, normalizeSize, COLORS} from '../constants';

const CustomTabBarButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: normalizeSize(-20),
        justifyContent: 'center',
        alignItems: 'center',

        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: COLORS.primary,
          borderWidth: 6,
          borderColor: COLORS.white,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    // shadow properties for iOS
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: normalizeSize(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

    // shadow properties for android
    elevation: 5,
  },
});

export default CustomTabBarButton;
