import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// component
import {
  Container,
  LoadingCompenent,
  Carousel,
  Loading,
  HelperText,
} from '../components';

// dummuy data
import {shopList} from '../constants/dummyData';

import {dummyData, SIZES, COLORS, normalizeSize} from '../constants/index';

// API
import categoriesAPI from '../api/categories';

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

const {width, height} = SIZES; // screen height and width

const ProductCategoryScreen = ({navigation, route}) => {
  const [categories, setCategories] = useState([]); // product categories
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // get product categories
  const getProductCategories = async () => {
    const result = await categoriesAPI.getAllCategories();
    if (result == null) {
      setLoading(false);
      setFailed(true);
    }
    const {data} = result.data; // get data from result object
    setCategories(data); // setting product categories array
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  return (
    <Container style={styles.container}>
      {/* carousel */}
      <Carousel />

      {/* product categories */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(10),
    paddingVertical: normalizeSize(10),
    backgroundColor: COLORS.white,
  },
});

export default ProductCategoryScreen;
