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
  const {productCategoryId} = route.params;
  const [loading, setLoading] = useState(true);
  const [shopData, setShopData] = useState([]);

  // get all shops that sell for selected product category
  const getAllShops = () => {
    let shops = shopList.filter(s => {
      return s.productCategoryIds.filter(i => {
        if (i === productCategoryId) {
          console.log(`found: ${s}`);
          shopData.push(s);
          return;
        }
        return;
      });
    });
  };

  useEffect(() => {
    console.log(typeof productCategoryId);
    getAllShops();

    if (shopData.length > 0) {
      setLoading(false);
      console.log(shopData);
    }
  }, []);

  const ShopItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        style={{
          width: SIZES.width - normalizeSize(20),
          height: (SIZES.width - normalizeSize(20)) * 0.3,
          overflow: 'hidden',
        }}
        onPress={() =>
          navigation.navigate('ProductListingScreen', {
            shopId: item.id,
          })
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: normalizeSize(10),
            marginBottom: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.gray2,
          }}>
          {/* image container */}
          <View
            style={{
              width: '20%',
              height: (SIZES.width - normalizeSize(20)) * 0.3,
              overflow: 'hidden',
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={item.shopImage}
              resizeMode="contain"
            />
          </View>

          {/* shop name and address*/}
          <View
            style={{
              width: '75%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: normalizeSize(16),
                color: COLORS.primary,
              }}
              numberOfLines={2}>
              {item.shopName}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: normalizeSize(14),
              }}
              adjustsFontSizeToFit={true}>
              {item.address}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Container
      style={{
        paddingHorizontal: normalizeSize(10),
        paddingVertical: normalizeSize(10),
        backgroundColor: COLORS.white,
      }}>
      {/* render loading component while getting data from API */}
      {loading && (
        <View style={styles.loadingContainer}>
          <LoadingCompenent size="large" color={COLORS.primary} />
        </View>
      )}

      {/* list of shops that sell selected prodcuct category */}
      <FlatList
        data={shopList}
        keyExtractor={i => i.id.toString()}
        renderItem={({item, index}) => <ShopItem item={item} index={index} />}
      />
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
