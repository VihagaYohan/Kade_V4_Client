import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from '../components/Icon';

// constants
import {COLORS, SIZES, normalizeSize} from '../constants';

const AppTextInput = ({icon, iconName, iconColor, style, ...otherProps}) => {
  return (
    <View style={styles.container}>
      {icon === true ? <Icon name={iconName} color={iconColor} /> : null}
      <TextInput style={[styles.textInput, style]} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  textInput: {
    fontSize: normalizeSize(15),
    width: '100%',
    color:COLORS.gray
  },
});

export default AppTextInput;
