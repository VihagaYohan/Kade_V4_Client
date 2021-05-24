import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// components
import {Icon, AppText} from '../components';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';
import {
  removeItemFromCart,
  increaseQuantityBy1,
  decreaseQuantityBy1,
} from '../store/actions/cart';

const {width} = SIZES;

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
    <TouchableOpacity style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
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
});

export default CartItem;
