import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Icon from '../components/Icon';

// constants
import {COLORS, SIZES, normalizeSize} from '../constants';

const AppTextInput = ({icon, iconName, iconColor, ...otherProps}) => {
  return (
    <View style={styles.container}>
      {icon === true ? <Icon name={iconName} color={iconColor} /> : null}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '100%',
  },
  textInput: {
    fontSize: normalizeSize(15),
  },
});

export default AppTextInput;
