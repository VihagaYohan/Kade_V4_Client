import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
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
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

// routes
import routes from '../navigation/routes';

const {width, height} = SIZES;

const itemWidth = (width - normalizeSize(20) - normalizeSize(10)) / 2; // product item width
const itemHeight = width * 0.6; // product item height

const ShopScreen = ({navigation, route}) => {
  const {shopId, shopName} = route.params;
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

  // product item component
  const ProductItem = ({item, index}) => {
    let stockStatus = undefined;
    let stockCount = item.stockCount;

    // checking stock count and status message to display
    if (stockCount > 10) {
      stockStatus = {
        status: 'Available',
        color: COLORS.green,
      };
    } else if ((stockCount = 0)) {
      stockStatus = {
        status: 'Unavailable',
        color: COLORS.red,
      };
    } else {
      stockStatus = {
        status: `Only ${stockCount} left `,
        color: COLORS.blue,
      };
    }
    return (
      <TouchableOpacity
        style={{
          width: itemWidth,
          height: itemHeight,
          marginRight: index % 2 == 0 ? normalizeSize(9) : 0,
          marginBottom: normalizeSize(20),
          overflow: 'hidden',
        }}
        onPress={() =>
          navigation.navigate(routes.Product_Details, {
            productId: item._id,
          })
        }>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.prodcutImage}
            source={{uri: item.photo}}
            resizeMode="contain"
          />
        </View>

        {/* content container */}
        <View style={styles.productItemContentContainer}>
          {/* product name */}
          <AppText style={styles.productName} numberOfLines={2}>
            {item.productName}
          </AppText>

          {/* stock count status */}
          <AppText
            style={{
              color: stockStatus.color,
              fontFamily: 'Poppins-Medium',
              marginVertical: normalizeSize(5),
            }}>
            {stockStatus.status}
          </AppText>

          {/* price */}
          <AppText style={styles.price}>Rs. {item.price.toFixed(2)}</AppText>
        </View>
      </TouchableOpacity>
    );
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
          <Icon
            name="arrow-left"
            size={20}
            color={COLORS.secondary}
            onPress={() => navigation.goBack()}
          />
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

      {/* section 2 - contains shop name and right chevron to navigate to shop details screen */}
      <View
        style={{
          flexDirection: 'row',
          height: normalizeSize(60),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AppText
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: normalizeSize(20),
            color: COLORS.primary,
          }}>
          {shopName}
        </AppText>

        <Icon
          name="chevron-right"
          size={20}
          color={COLORS.secondary}
          onPress={() =>
            navigation.navigate(routes.Shop_Detail, {
              shopId: shopId,
            })
          }
        />
      </View>

      <FlatList
        data={product}
        numColumns={2}
        keyExtractor={i => i._id}
        showsVerticalScrollIndicator={false}
        renderItem={ProductItem}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeSize(10),
  },
  // section 1 styles
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

  // product item styles
  imageContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: COLORS.gray3,
    overflow: 'hidden',
    borderRadius: normalizeSize(10),
  },
  prodcutImage: {
    width: '100%',
    height: '100%',
  },
  productItemContentContainer: {
    width: '100%',
    height: '40%',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(13),
    color: COLORS.secondary,
  },
  price: {
    color: COLORS.gray2,
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(13),
    marginVertical: normalizeSize(5),
  },
});

export default ShopScreen;
