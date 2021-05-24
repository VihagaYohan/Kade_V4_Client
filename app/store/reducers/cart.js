import {
  SHOP_ID,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CART_TOTAL,
} from '../actions/types';

const initialState = {
  cart: [
    {
      productId: '60a37dc952d58609d2c030e1',
      photo:
        'https://kade-bucket.s3.ap-south-1.amazonaws.com/photo_60a37dc952d58609d2c030e1.png',
      productName: 'Alenware m15 R3 Gaming Laptop',
      quantity: 1,
      unitPrice: 275580,
      lineTotal: 275580,
    },
    {
      productId: '60a37f4952d58609d2c030e3',
      photo:
        'https://kade-bucket.s3.ap-south-1.amazonaws.com/photo_60a37f4952d58609d2c030e3.png',
      productName: 'Microsoft Surface',
      quantity: 1,
      unitPrice: 230000,
      lineTotal: 230000,
    },
  ],
  cartTotal: 0,
  shopId: '60a3824852d58609d2c030e9',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOP_ID':
      const shopId = action.data;
      return {
        ...state,
        shopId: shopId,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };

    case 'INCREASE_QUANTITY':
      manageQuantity(state.cart, action.data, 'increase');

      return {
        ...state,
        cartTotal: getOrderTotal(state.cart),
      };

    case 'DECREASE_QUANTITY':
      manageQuantity(state.cart, action.data, 'decrease');

      return {
        ...state,
        cartTotal: getOrderTotal(state.cart),
      };
    case 'CART_TOTAL':
      return {
        ...state,
        cartTotal: getOrderTotal(state.cart),
      };

    case 'REMOVE_PRODUCT':
      const cart = state.cart.filter(i => i.productId !== action.data);

      return {
        ...state,
        cart: cart,
        cartTotal: getOrderTotal(cart),
      };
    default:
      return state;
  }
};

// manage order item quantity
const manageQuantity = (cart, id, operationType) => {
  const product = cart.find(i => i.productId === id);

  let total = 0;
  if (operationType === 'increase') {
    product.quantity = product.quantity + 1;
    const total = getOrderTotal(cart);
    console.log('total : ' + total);
  } else {
    product.quantity = product.quantity - 1;
  }
  product.lineTotal = product.unitPrice * product.quantity;
};

// get order total
const getOrderTotal = cart => {
  let total = 0;
  cart.map(i => {
    total = total + i.lineTotal;
  });
  return total;
};
