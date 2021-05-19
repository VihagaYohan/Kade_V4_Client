import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

// components
import AppText from './AppText';

// constants
import {COLORS, normalizeSize} from '../constants';

const HelperText = ({children, style}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('../assets/images/failed.png')}
      />
      <AppText style={[styles.text, style]}>{children}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: normalizeSize(50),
    height: normalizeSize(50),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
    color: COLORS.secondary,
  },
});

export default HelperText;
