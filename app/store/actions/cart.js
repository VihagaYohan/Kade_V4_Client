import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CART_TOTAL,
    SHOP_ID,
  } from './types';
  
  export const orderShopId = (shopId) =>({
    type:SHOP_ID,
    data:shopId
  })
  
  export const getCartTotal = () => ({
    type: CART_TOTAL,
  });
  
  export const addItemToCart = (item) => ({
    type: ADD_PRODUCT,
    data: item,
  });
  
  export const removeItemFromCart = (productId) => ({
    type: REMOVE_PRODUCT,
    data: productId,
  });
  
  export const increaseQuantityBy1 = (productId) => ({
    type: INCREASE_QUANTITY,
    data: productId,
  });
  
  export const decreaseQuantityBy1 = (productId) => ({
    type: DECREASE_QUANTITY,
    data: productId,
  });