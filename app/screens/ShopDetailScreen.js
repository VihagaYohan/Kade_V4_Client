import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Overlay,
} from 'react-native-maps';
import axios from 'axios';

// components
import {Container, AppText, Loading, HelperText, Icon} from '../components/';

// constants
import {SIZES, COLORS, SHOP_MARKER, normalizeSize} from '../constants';

// API
import baseURL from '../api/baseURL';

const {width, height} = SIZES; // screen width and height

const ShopDetailScreen = ({navigation, route}) => {
  const {shopId} = route.params;
  const [loading, setLoading] = useState(false); // loading
  const [failed, setFailed] = useState(false); // failed to get data from backend
  const [shop, setShop] = useState(); // contains shop data

  // get shop data
  const getShopData = async id => {
    setLoading(true);
    try {
      const result = await axios.get(baseURL + '/api/shops/' + id);
      if (result == null) {
        setLoading(false);
        setFailed(true);
        return;
      }

      const data = result.data;
      setShop(data.data);
      setLoading(false);
      setFailed(false);
      console.log(shop);
    } catch (error) {
      console.log(error);
      setFailed(true);
    }
  };

  useEffect(() => {
    getShopData(shopId);
  }, []);

  if (loading) return <Loading />;
  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  if (shop == null) return <Loading />;

  return (
    <Container style={styles.container}>
      {/* map container */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: shop.location.coordinates[1],
            longitude: shop.location.coordinates[0],
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}>
          <Marker
            coordinate={{
              latitude: shop.location.coordinates[1],
              longitude: shop.location.coordinates[0],
            }}>
            <Callout tooltip={false} style={styles.callOut}>
              <AppText style={styles.callOutText}>{`${shop.name}`}</AppText>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.backIconContainer}>
          <Icon
            name="arrow-left"
            size={normalizeSize(20)}
            color={COLORS.secondary}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      {/* shop details */}
      <ScrollView style={styles.contentContainer}>
        {/* shop name */}
        <View style={styles.shopNameContainer}>
          <AppText style={styles.shopName}>{shop.name}</AppText>
        </View>

        {/* shop address*/}
        <View style={styles.textContentContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="map-marker"
              size={normalizeSize(30)}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.textContent}>
            <AppText
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: normalizeSize(14),
              }}
              numOfLines={4}>
              {shop.location.formattedAddres}
            </AppText>
          </View>
        </View>

        {/* shop email address*/}
        <View style={styles.textContentContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="envelope-o"
              size={normalizeSize(30)}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.textContent}>
            <AppText
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: normalizeSize(14),
              }}
              numOfLines={4}>
              {shop.email}
            </AppText>
          </View>
        </View>

        {/* shop phone number */}
        <View style={styles.textContentContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="phone"
              size={normalizeSize(30)}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.textContent}>
            {shop.phoneNumber.map(i => (
              <AppText
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: normalizeSize(14),
                }}
                numOfLines={4}>
                {i}
              </AppText>
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: '30%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  callOut: {
    width: normalizeSize(100),
    height: normalizeSize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  callOutText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(12),
  },
  backIconContainer: {
    width: normalizeSize(40),
    height: normalizeSize(40),
    borderRadius: normalizeSize(20),
    backgroundColor: COLORS.gray1,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '70%',
    //paddingHorizontal: normalizeSize(10),
  },
  shopNameContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  shopName: {
    margin: normalizeSize(20),
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(20),
  },
  textContentContainer: {
    flexDirection: 'row',
    marginHorizontal: normalizeSize(10),
    paddingVertical: normalizeSize(20),
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalizeSize(10),
  },
  textContent: {
    width: '70%',
  },
});

export default ShopDetailScreen;
