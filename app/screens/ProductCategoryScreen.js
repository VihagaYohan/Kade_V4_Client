import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component
import {Container, LoadingCompenent, Carousel} from '../components';

// dummuy data
import {shopList} from '../constants/dummyData';

import {dummyData, SIZES, COLORS, normalizeSize} from '../constants/index';

// carousel items
const carouselItems = [
  {
    id: 1,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item1.png',
  },
  {
    id: 2,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item2.png',
  },
  {
    id: 3,
    url: 'https://kade-bucket.s3.ap-south-1.amazonaws.com/Carousel/item3.png',
  },
];

const {width, height} = SIZES;

const ProductCategoryScreen = ({navigation, route}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);

  return (
    <Container
      style={{
        paddingHorizontal: normalizeSize(10),
        paddingVertical: normalizeSize(10),
        backgroundColor: COLORS.white,
        borderWidth: 1,
      }}>
      {/* carousel */}
      <Carousel />
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
