import React, {Component, useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';

// components
import {
  Container,
  HelperText,
  Icon,
  Loading,
  AppText,
  AppButton,
  Quantity,
  IoniconIcon,
} from '../components';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

// API
import productAPI from '../api/products';
import baseURL from '../api/baseURL';

const {width, height} = SIZES;

import axios from 'axios';

const bannerHeight = height / 3; //product image container height
const contentContainerHeight = height - bannerHeight; // content container height. this contain product name,shop name, shop image, product description..etc

const x = (contentContainerHeight * normalizeSize(30)) / normalizeSize(100);
const y = (contentContainerHeight * normalizeSize(50)) / normalizeSize(100);

const ProductDetailsScreen = ({navigation, route}) => {
  const {productId, url} = route.params; // get product id
  const [product, setProduct] = useState(); // product categories
  const [productDescription, setProductDescription] = useState(); // product description
  const [loading, setLoading] = useState(false); // loading
  const [failed, setFailed] = useState(false); // failed to get data from backend
  const [quantity, setQuantity] = useState(); // quantity

  // get product by product ID
  const getProduct = async id => {
    setLoading(true);
    try {
      const result = await axios.get(baseURL + '/api/products/' + id);
      if (result == null) {
        setLoading(false);
        setFailed(true);
        return;
      }

      const data = await result.data;

      console.log(data.data);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    getProduct(productId);
  }, []);

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  if (product == null) return <Loading />;

  return (
    <Container style={styles.container}>
      {/* product image container */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          style={styles.banner}
          source={{uri: product.photo}}
          resizeMode="contain">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: normalizeSize(10),
            }}>
            <Icon
              name="arrow-left"
              size={20}
              color={COLORS.secondary}
              onPress={() => navigation.goBack()}
            />

            <IoniconIcon
              name="md-heart-outline"
              size={20}
              color={COLORS.primary}
            />
          </View>
        </ImageBackground>
      </View>

      {/* content container */}
      <View style={styles.contentContainer}>
        {/* content - product name, shop name and shop image, product description */}
        <View style={styles.content}>
          {/* header */}
          <View style={styles.header}>
            {/* product name */}
            <View style={styles.productNameContainer}>
              <AppText style={styles.productName} numOfLines={2}>
                {product.productName}
              </AppText>
            </View>

            {/* shop image and name name */}
            <View style={styles.shopContainer}>
              <TouchableOpacity style={styles.shopImageContainer}>
                <Image
                  style={styles.shopImage}
                  source={{uri: product.shopId.photo}}
                />
              </TouchableOpacity>

              {/* shop name */}
              <AppText style={styles.shopName}>{product.shopId.name}</AppText>
            </View>
          </View>

          {/* product desctiption title */}
          <View style={styles.productDescriptionTitleContainer}>
            <AppText style={styles.productDescriptionTitle}>
              Product Description
            </AppText>
            <View style={styles.productDescriptionLine}></View>
          </View>

          {/* product description line items*/}
          <ScrollView
            contentContainerStyle={{
              marginTop: normalizeSize(10),
            }}
            showsVerticalScrollIndicator={false}>
            {product.description.split('\n').map(i => {
              return (
                <Unorderedlist
                  color={COLORS.primary}
                  style={{fontSize: normalizeSize(20)}}>
                  <AppText style={styles.productDescriptionLineItem}>
                    {i}
                  </AppText>
                </Unorderedlist>
              );
            })}
          </ScrollView>
        </View>

        {/* buy section - product price and add to cart button */}
        <View style={styles.buySectionContainer}>
          <View style={styles.priceContainer}>
            <AppText style={styles.price}>
              Rs. {product.price.toFixed(2)}
            </AppText>
          </View>

          <View style={styles.addToCartContainer}>
            <View style={styles.addToCartInnerContainer}>
              <Icon name="shopping-cart" size={20} color={COLORS.primary} />
              <AppText style={styles.addToCartText}>Add To Cart</AppText>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: COLORS.white,
  },
  // photo contianer and photo
  bannerContainer: {
    width,
    height: bannerHeight,
  },
  banner: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: contentContainerHeight,
    width: width,
    borderTopRightRadius: normalizeSize(25),
    borderTopLeftRadius: normalizeSize(25),
    backgroundColor: COLORS.gray3,
  },
  content: {
    width: '100%',
    height: '70%',
    paddingHorizontal: normalizeSize(20),
  },
  header: {
    width: '100%',
    height: '22%',
  },
  productNameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(14),
    color: COLORS.primary,
  },
  productDescriptionLine: {
    width: '50%',
    height: normalizeSize(1),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  productDescriptionLineItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(12.5),
    color: COLORS.secondary,
    marginBottom: Platform.OS === 'ios' ? normalizeSize(5) : null,
  },

  // shop stylings
  shopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopImageContainer: {
    width: normalizeSize(50),
    height: '100%',
    marginRight: normalizeSize(15),
  },
  shopImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  shopName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.secondary,
  },

  // product description stylings
  productDescriptionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalizeSize(10),
  },

  productDescriptionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
    color: COLORS.secondary,
  },

  // buy section stylings
  buySectionContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: normalizeSize(25),
    borderTopRightRadius: normalizeSize(25),
    paddingHorizontal: normalizeSize(10),
    justifyContent: 'space-between',
  },
  priceContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalizeSize(16),
  },

  // add to cart section
  addToCartContainer: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartInnerContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray3,
    padding: normalizeSize(10),
    borderRadius: normalizeSize(10),
  },
  addToCartText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
    marginLeft: normalizeSize(10),
  },
});

export default ProductDetailsScreen;
