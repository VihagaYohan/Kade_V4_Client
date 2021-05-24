import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

// componetns
import {Container, AppText, HelperText, Loading, Icon} from '../components/';

// constants
import {SIZES, normalizeSize, COLORS} from '../constants/';

// API
import baseURL from '../api/baseURL';

const {width, height} = SIZES; // screen width and height
const headerHeight = height * 0.05; // height of the header section
const bottomHeight = height * 0.3; // height of the container that holds cart items
const cartListContainerHeight = height - (headerHeight + bottomHeight); // height of the  bottom section which holds price and proceed button

const OrderScreen = ({navigation, route}) => {
  const {userAddress} = route.params;
  const [userId, setUserId] = useState(); // user id
  const [loading, setLoading] = useState(false); // loading
  const [failed, setFailed] = useState(false); // failed to get data from backend
  const [user, setUser] = useState();

  const {cart} = useSelector(state => state);
  const cartItems = cart.cart;
  const cartTotal = cart.cartTotal;
  const shopId = cart.shopId;

  // get userId from async storage
  const getUserId = async () => {
    setLoading(true);
    try {
      const result = await AsyncStorage.getItem('@user_id');
      if (result == undefined) {
        setLoading(false);
        setFailed(true);
        return;
      }

      // user id
      const jsonData = JSON.parse(result);
      setUserId(jsonData);

      // getting user
      try {
        const result = await axios.get(baseURL + '/api/users/' + jsonData);
        console.log(baseURL + '/api/users/' + jsonData);
        if (result == null) {
          setLoading(false);
          setFailed(true);
          return;
        }

        const data = await result.data;
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailed(true);
      }
    } catch (error) {
      console.log(error);
      setFailed(true);
    }
  };

  // useEffect
  useEffect(() => {
    getUserId();
  }, []);

  // find user
  const getUser = async userid => {
    setLoading(true);
  };

  // cart items component
  const CartItem = ({item, index}) => {
    return (
      <View style={styles.cartItemContainer}>
        {/* product image container */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.photo}}
            resizeMode="contain"
          />
        </View>

        {/* product item content */}
        <View style={styles.itemContent}>
          {/* product name */}
          <AppText
            style={styles.itemName}
            adjustsFontSizeToFit={true}
            numberOfLines={2}>
            {item.productName}
          </AppText>

          {/* product price */}
          <View style={styles.innerContent}>
            {/* unit price */}
            <AppText style={styles.unitPrice}>
              Rs.{item.unitPrice.toFixed(2)}
            </AppText>

            <AppText>X</AppText>

            {/* quantity */}
            <AppText style={styles.quantity}>Qty. {item.quantity}</AppText>
          </View>
        </View>
      </View>
    );
  };

  if (user == undefined || null) return <Loading />;

  if (failed)
    return <HelperText>Unable to load data. Please try again</HelperText>;

  return (
    <Container style={styles.container}>
      {/* header section - contains back button, title and the an empty view to make title center */}
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={normalizeSize(20)}
          color={COLORS.secondary}
        />
        <AppText style={styles.orderText}>Order</AppText>
        <View
          style={{
            width: normalizeSize(20),
            height: normalizeSize(20),
          }}></View>
      </View>

      {/* delivery location address */}
      <View style={styles.deliveryAddressContainer}>
        <AppText style={styles.deliveryAddressTitle}>Delivery Location</AppText>
        <AppText style={styles.deliveryAddress}>{userAddress}</AppText>
      </View>

      {/* cart items */}
      <View style={styles.cart}>
        <AppText style={styles.deliveryAddressTitle}>My Cart</AppText>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          keyExtractor={i => i._id}
          renderItem={({item, index}) => <CartItem item={item} index={index} />}
        />
      </View>

      <AppText
        style={[
          styles.deliveryAddressTitle,
          {marginVertical: normalizeSize(20)},
        ]}>
        {`Order Total is Rs. ${cartTotal.toFixed(2)}`}
      </AppText>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingHorizontal: normalizeSize(20),
  },
  header: {
    flexDirection: 'row',
    height: headerHeight,
    alignItems: 'center',
    width: '100%',
  },
  orderText: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(20),
    color: COLORS.secondary,
    textAlign: 'center',
  },

  // delivery address
  deliveryAddressContainer: {
    marginVertical: normalizeSize(10),
  },
  deliveryAddressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(16),
    color: COLORS.secondary,
    marginBottom: normalizeSize(5),
  },
  deliveryAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(14),
    color: COLORS.gray,
  },

  // cart item container
  cart: {
    width: '100%',
    height: width * 0.5,
  },
  cartItemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: width * 0.25,
    marginBottom: normalizeSize(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    height: '100%',
    backgroundColor: COLORS.gray3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: normalizeSize(10),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    width: '65%',
    height: '100%',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.secondary,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(13),
    color: COLORS.primary,
    marginRight: normalizeSize(5),
  },
  quantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalizeSize(13),
    color: COLORS.secondary,
    marginLeft: normalizeSize(5),
  },
});

export default OrderScreen;
