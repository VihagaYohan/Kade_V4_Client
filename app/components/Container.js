import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {getBottomSpace, ifIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('screen');

// Wrapper/parent container for all screens. All the children components render within this parent/wrapper component
const Container = ({children, style}) => {
  return (
    <SafeAreaView style={[{width, height}]}>
      <View style={[{flex: 1}, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Container;
