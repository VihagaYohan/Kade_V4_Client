import {useFocusEffect} from '@react-navigation/core';
import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

// component
import {Container, LoadingCompenent} from '../components';

// dummuy data
import {shopList} from '../constants/dummyData';

import {dummyData, SIZES, COLORS, normalizeSize} from '../constants/index';

const ProductCategoryScreen = ({navigation, route}) => {
  return (
    <Container
      style={{
        paddingHorizontal: normalizeSize(10),
        paddingVertical: normalizeSize(10),
        backgroundColor: COLORS.white,
      }}>
      <Text>Home Screen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default ProductCategoryScreen;
