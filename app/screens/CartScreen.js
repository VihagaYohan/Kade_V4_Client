import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// components
import {
  Container,
  AppText,
  HelperText,
  Loading,
  Icon,
  Quantity,
} from '../components';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

// Redux actions
import {
  increaseQuantityBy1,
  decreaseQuantityBy1,
  getCartTotal,
  removeItemFromCart,
} from '../store/actions/cart';

// routes
import routes from '../navigation/routes';

const {width, height} = SIZES; // device width and height
const headerHeight = height * 0.1; // height of the header section
const bottomHeight = height * 0.3; // height of the container that holds cart items
const cartListContainerHeight = height - (headerHeight + bottomHeight); // height of the  bottom section which holds price and proceed button

const CartScreen = ({navigation}) => {
  const [user, setUser] = useState();
  const data = useSelector(state => state.cart);
  const cart = data.cart;
  const orderTotal = data.cartTotal;

  const dispatch = useDispatch();

  // get order total from redux store
  const getOrderTotal = cart => {
    dispatch(getCartTotal(cart));
  };

  // useEffect
  useEffect(() => {
    getOrderTotal(cart);
    //checkUser(); // call check user method
  }, []);

  // product item component - Do not separate this component. Tried creating a separate component. Redux state did update but UI elements did not update
  const CartItem = ({
    navigation,
    productId,
    photo,
    name,
    unitPrice,
    quantity,
    productTotal,
  }) => {
    const [qty, setQty] = useState(quantity);
    const [lineTotal, setLineTotal] = useState(productTotal);

    const dispatch = useDispatch();

    useEffect(() => {
      setLineTotal(unitPrice * qty);
    });

    return (
      <TouchableOpacity style={styles.productItemContainer}>
        {/* product image */}
        <View style={styles.productImageContainer}>
          <Image
            style={styles.productImage}
            source={{uri: photo}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          {/* product name container */}
          <View style={styles.productNameContainer}>
            <AppText
              style={styles.productName}
              numberOfLines={2}
              adjutsFontSizeToFit={true}>
              {name}
            </AppText>
          </View>

          {/* product price and delete line icon */}
          <View style={styles.productPriceContainer}>
            <AppText
              style={styles.lineTotal}
              numberOfLines={2}
              adjutsFontSizeToFit={true}>
              Rs.{lineTotal.toFixed(2)}
            </AppText>

            <Icon
              name="trash-o"
              size={normalizeSize(20)}
              color={COLORS.primary}
              onPress={() => dispatch(removeItemFromCart(productId))}
            />
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Icon
            name="plus-square"
            size={normalizeSize(20)}
            color={COLORS.blue}
            onPress={() => dispatch(increaseQuantityBy1(productId))}
          />

          <AppText>{qty}</AppText>

          <Icon
            name="minus-square"
            size={normalizeSize(20)}
            color={COLORS.red}
            onPress={() => dispatch(decreaseQuantityBy1(productId))}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      {/* header section */}
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={normalizeSize(20)}
          color={COLORS.secondary}
        />

        <AppText style={styles.title}>My Cart</AppText>

        <Icon
          style={styles.backButtonContainer}
          name="trash-o"
          size={normalizeSize(20)}
          color={COLORS.secondary}
        />
      </View>

      {/* cart items container */}
      <View style={styles.cartItemsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
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
        />
      </View>

      {/* bottom section - this contains total order cost and the proceed button */}
      <View style={styles.bottom}>
        <View style={styles.orderTotalContainer}>
          <AppText style={styles.orderTotal}>
            Rs. {orderTotal.toFixed(2)}
          </AppText>
        </View>

        <View style={styles.proceedButtonContainer}>
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => navigation.navigate(routes.User_Location)}>
            <AppText style={styles.proceedButtonText}>Proceed</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  header: {
    flexDirection: 'row',
    width: width - normalizeSize(20),
    height: headerHeight,
    alignItems: 'center',
    marginHorizontal: normalizeSize(10),
  },
  cartItemsContainer: {
    width: '100%',
    height: cartListContainerHeight,
    backgroundColor: COLORS.gray3,
    borderTopRightRadius: normalizeSize(30),
    borderTopLeftRadius: normalizeSize(30),
    paddingHorizontal: normalizeSize(10),
    paddingTop: normalizeSize(20),
  },
  bottom: {
    width: '100%',
    height: bottomHeight / 2,
    flexDirection: 'row',
    borderTopLeftRadius: normalizeSize(30),
    borderTopRightRadius: normalizeSize(30),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(18),
    color: COLORS.secondary,
    textAlign: 'center',
  },

  productItemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: width * 0.25,
    marginBottom: normalizeSize(10),
    borderRadius: normalizeSize(15),
    paddingHorizontal: normalizeSize(10),
    backgroundColor: COLORS.white,
  },
  productImageContainer: {
    width: '20%',
    height: width * 0.25,
    overflow: 'hidden',
  },
  // product image
  productImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '60%',
    height: '100%',
  },
  productNameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(12),
    color: COLORS.secondary,
  },

  productPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lineTotal: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.primary,
  },

  // quantity counter
  quantityContainer: {
    width: '20%',
    height: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // bottom section styles
  orderTotalContainer: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  orderTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalizeSize(16),
  },
  proceedButtonContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  proceedButton: {
    paddingHorizontal: normalizeSize(25),
    paddingVertical: normalizeSize(10),
    backgroundColor: COLORS.primary,
    borderRadius: normalizeSize(25),

    // shadow for android
    elevation: 10,

    // shadow iOS
    shadowColor: COLORS.gray2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 0.5,
    shadowOpacity: 0.1,
  },
  proceedButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalizeSize(14),
    color: COLORS.white,
  },
});

export default CartScreen;
