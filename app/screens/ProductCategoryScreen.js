import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component
import {Container, LoadingCompenent} from '../components';

// dummuy data
import {shopList} from '../constants/dummyData';

import {dummyData, SIZES, COLORS, normalizeSize} from '../constants/index';

const ProductCategoryScreen = ({navigation, route}) => {
  const [token, setToken] = useState('');

  const readData = async () => {
    const value = await AsyncStorage.getItem('token');
    setToken(value);
  };

  useEffect(() => {
    readData()
  }, []);
  return (
    <Container
      style={{
        paddingHorizontal: normalizeSize(10),
        paddingVertical: normalizeSize(10),
        backgroundColor: COLORS.white,
      }}>
      <Text>Home Screen</Text>
      <Text>{token}</Text>
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
