import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import {Container, Icon as IconComponent} from '../components';

// constants
import {COLORS} from '../constants';


// redux
import {
  increaseQuantityBy1,
  decreaseQuantityBy1,
  getCartTotal,
  removeItemFromCart,
} from '../store/actions/cart';

// navigation
import routes from '../navigation/routes';

const CartScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const data = useSelector(state => state.cart);
  const cart = data.cart;
  const orderTotal = data.cartTotal;

  const checkUser = async () => {
    // check whether user has logged-in
    const value = await AsyncStorage.getItem('@login_info');
    if (!value) return;

    const userObj = JSON.parse(value);
    setUser(userObj);
  };

  // console.log(orderTotal);

  const dispatch = useDispatch();

  const getOrderTotal = cart => {
    dispatch(getCartTotal(cart));
  };

  useEffect(() => {
    getOrderTotal(cart);
    checkUser(); // call check user method
  }, []);

  // cart item component
  const CartItem = ({
    productId,
    photo,
    name,
    unitPrice,
    quantity,
    productTotal,
  }) => {
    const [qty, setQty] = useState(quantity);
    const [lineTotal, setLineTotal] = useState(productTotal);

    useEffect(() => {
      setLineTotal(unitPrice * qty);
    });

    return (
      <View style={styles.orderItem}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: photo}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.section_1}>
          <Text style={styles.productName} numberOfLines={3}>
            {name}
          </Text>

          <View style={styles.section_2}>
            <View style={styles.counterContainer}>
              <IconComponent
                name="plus-square"
                size={30}
                color={COLORS.blue}
                onPress={() => dispatch(increaseQuantityBy1(productId))}
              />
              <Text style={styles.counter}>{qty}</Text>

              <IconComponent
                name="minus-circle"
                size={30}
                color={COLORS.red}
                onPress={() => dispatch(decreaseQuantityBy1(productId))}
              />
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Rs. {lineTotal.toFixed(2)}</Text>
              <Icon
                name="cart-remove"
                size={30}
                color={COLORS.primary}
                onPress={() => dispatch(removeItemFromCart(productId))}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  // render if the cart is empty
  if (data.cart.length === 0)
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, color: COLORS.gray2}}>
          There are no items in shopping cart
        </Text>
      </View>
    );


    return (
        <Container></Container>
    )

/*   return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.primaryTitle}>Your Items</Text>
        {cart.length === 1 ? (
          <Text style={styles.subTitle}>You have 1 item in your cart</Text>
        ) : (
          <Text style={styles.subTitle}>
            You have {cart.length} items in your cart
          </Text>
        )}
      </View>
      <FlatList
        data={cart}
        keyExtractor={(i, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <CartItem
              productId={item.productId}
              photo={item.photo}
              name={item.productName}
              unitPrice={item.unitPrice}
              quantity={item.quantity}
              productTotal={item.lineTotal}
            />
          );
        }}
      /> */

{/*       <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.black,
          }}>
          Order total is Rs.{orderTotal}
        </Text>
        {user
          ? {
              
                <AppButton title="Checkout" onPress={() => navigation.navigate('User_Location')} />  
            }
          : {
               <AppButton
            title="CheckOut"
            onPress={() => navigation.navigate(routes.Auth_Nav)}
          /> 
            }}
      </View>  */}
    /* </Container> */
  /* ); */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    bottom: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItem: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    width: `30%`,
    height: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  section_1: {
    flexDirection: 'column',
    width: '70%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray2,
  },
  section_2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  counterButtonSymbol: {
    fontWeight: 'bold',
    color: COLORS.red,
  },
  counter: {
    marginHorizontal: 10,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.gray2,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
  },
  header: {
    width: '100%',
    marginVertical: 30,
  },
  primaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.gray2,
    marginTop: 10,
  },
});

export default CartScreen;
