import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

// components
import {AppText, AppTextInput, Icon} from '../components/';

// constants
import {SIZES, normalizeSize, COLORS} from '../constants';

const SearchField = () => {
  return (
    <View style={styles.container}>
      <AppTextInput
        style={{borderWidth: 1, borderColor: 'red', width: '80%'}}
        placeholder="Search here"
      />
      <Icon name="search" size={20} color={COLORS.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default SearchField;
