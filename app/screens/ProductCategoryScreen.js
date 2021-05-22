import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  ScrollView,
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

// routes
import routes from '../navigation/routes';

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
    console.log(result);
    const {data} = result.data; // get data from result object
    setCategories(data); // setting product categories array
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  // product category item
  const CategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: (width - normalizeSize(20)) / 2 - normalizeSize(10),
          height: (width - normalizeSize(20)) * 0.6,
          marginBottom: normalizeSize(20),
          marginRight: index % 2 ? 0 : normalizeSize(5),
          marginLeft: index % 2 ? normalizeSize(15) : 0,
          marginTop: index % 2 ? normalizeSize(20) : 0,
          borderRadius: 10,
          overflow: 'hidden',
        }}
        onPress={() =>
          navigation.navigate(routes.Product_Listing, {
            categoryId: item._id,
            name: item.name,
          })
        }>
        {/* product category image container */}
        <View style={styles.categoryImageContainer}>
          <Image
            style={styles.categoryImage}
            source={{uri: item.photo}}
            resizeMode="contain"
          />
        </View>

        {/* product category name */}
        <View style={styles.categoryNameContainer}>
          <Text
            style={styles.categoryName}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  return (
    <Container style={styles.container}>
      {/* carousel */}
      <View style={styles.carouselContainer}>
        <Carousel />
      </View>

      {/* product categories */}
      <View style={styles.productCategoryCotnainer}>
        <FlatList
          data={categories}
          contentContainerStyle={{paddingTop: normalizeSize(5)}}
          keyExtractor={i => i}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={CategoryItem}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(10),
    paddingVertical: normalizeSize(10),
    backgroundColor: COLORS.white,
  },
  carouselContainer: {
    width: width - normalizeSize(20),
    height: height / 3,
  },
  productCategoryCotnainer: {
    flex: 1,
  },
  // category item styles
  categoryImageContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    flex: 1,
  },
  categoryNameContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(16),
    color: COLORS.primary,
  },
});

export default ProductCategoryScreen;
