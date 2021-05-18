import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

// componetns
import {Icon} from '../components/index';

// constants
import {COLORS, SIZES, normalizeSize} from '../constants/index';

// search component
const Search = ({style}) => {
  const [value, setValue] = useState('');
  return (
    <View style={[styles.container, style]}>
      <Icon
        name="search"
        size={normalizeSize(20)}
        color={COLORS.gray}
        style={styles.icon}
      />
      <TextInput
        value={value}
        placeholder="Find your product"
        onChangeText={value => setValue(value)}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: normalizeSize(12),
    paddingHorizontal: normalizeSize(10),
    backgroundColor: COLORS.gray1,
  },

  icon: {
    width: '10%',
  },
  textInput: {
    width: '85%',
    height:'100%',
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color:COLORS.gray,
    paddingVertical: Platform.OS === 'ios' ? normalizeSize(10) : null,
  },
});

export default Search;
