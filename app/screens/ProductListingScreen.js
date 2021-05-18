import React, {Component, useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

// component
import {Container} from '../components/index';

import {SIZES, COLORS} from '../constants';

const ProductListingScreen = ({navigation, route}) => {
  const {shopId} = navigation.params;
  return (
    <Container>
      <Text>Product Listing Screen</Text>
      <Text>{shopId}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default ProductListingScreen;
