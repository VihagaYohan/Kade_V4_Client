import {INCREMENT, DECREMENT, ADD_PRODUCT} from './types';

export const addValue = num => ({
  type: INCREMENT,
  data: num,
});

export const decreaseValue = num => ({
  type: DECREMENT,
  data: num,
});

export const addItemToCart = item => ({
  type: ADD_PRODUCT,
  data: item,
});
