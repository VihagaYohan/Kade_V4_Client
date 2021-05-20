import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// component
import {Container, HelperText, Loading} from '../components/index';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

// API
import productsAPI from '../api/products';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width, height} = SIZES;

const itemWidth = width - normalizeSize(20);

const ProductListingScreen = ({navigation, route}) => {
  const {categoryId, name} = route.params; //
  const [products, setProducts] = useState([]); // product categories
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // get all products by category ID
  const getProducts = async id => {
    setLoading(true);
    const result = await productsAPI.getProductsByCategory(id);
    if (result == null) {
      setLoading(false);
      setFailed(true);
    }

    setLoading(false);
    const {data} = result.data; // get data from result object
    setProducts(data); // setting product categories array
  };

  useEffect(() => {
    getProducts(categoryId);
    console.log(products);
  }, []);

  // product item
  const ProductItem = ({item, index}) => {
    return (
      /* wrapper component */
      <TouchableOpacity
        style={{
          width: (itemWidth - normalizeSize(10)) / 2,
          height: normalizeSize(250),
          marginLeft: index % 2 ? normalizeSize(10) : 0,
          marginBottom: normalizeSize(20),
          borderRadius: normalizeSize(15),
          overflow: 'hidden',
          backgroundColor: 'white',
          elevation: 5,
          shadowColor: COLORS.gray,
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}
        onPress={() => alert(item.productName)}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.photo}}
            resizeMode="contain"
          />
        </View>

        {/* content container */}
        <View style={styles.contentContainer}>
          <Text style={styles.productName} adjustsFontSizeToFit={true}>
            {item.productName}
          </Text>
          <Text style={styles.shopName} numberOfLines={2}>
            {item.shopId.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
        data={products}
        keyExtractor={i => i}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ProductItem item={item} index={index} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeSize(10),
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(16),
    color: COLORS.secondary,
    textAlign: 'center',
  },
  shopName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(16),
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default ProductListingScreen;
