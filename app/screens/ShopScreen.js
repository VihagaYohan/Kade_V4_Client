import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import axios from 'axios';

// components
import {
  Container,
  AppText,
  Loading,
  HelperText,
  Icon,
  SearchField,
} from '../components/';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

// API
import baseURL from '../api/baseURL';

const {width, height} = SIZES;

const ShopScreen = ({navigation, route}) => {
  const {shopId} = route.params;
  const [loading, setLoading] = useState(false); // loading
  const [failed, setFailed] = useState(false); // failed to get data from backend
  const [product, setProduct] = useState(); // product

  // get all products in a shop by shop ID
  const getAllProducts = async id => {
    setLoading(true);
    try {
      const result = await axios.get(
        baseURL + '/api/products/' + id + '/products',
      );
      if (result == null) {
        setLoading(false);
        setFailed(true);
        return;
      }

      const data = await result.data;

      console.log(data.data); // for development purpose
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts(shopId);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  if (product == null) return <Loading />;

  return (
    <Container style={styles.container}>
      {/* section 1 - contains back button and search field */}
      <View style={styles.section1}>
        {/* icon  container */}
        <View style={styles.backButtonContainer}>
          {/* icon */}
          <Icon name="arrow-left" size={20} color={COLORS.secondary} />
        </View>

        {/* search field container */}
        <View style={styles.searchFieldContainer}>
          <TextInput
            style={styles.searchField}
            placeholder="Search here"
            autoCorrect={false}
          />
          <Icon
            name="search"
            size={20}
            color={COLORS.secondary}
            style={styles.searchIcon}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeSize(10),
    borderWidth: 1,
  },
  section1: {
    flexDirection: 'row',
    width: '100%',
    height: normalizeSize(60),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    width: normalizeSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFieldContainer: {
    width: width - normalizeSize(20) - normalizeSize(40),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchField: {
    width: '90%',
    height: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
  },
  searchIcon: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShopScreen;
