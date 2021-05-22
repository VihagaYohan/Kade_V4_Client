import {ADD_PRODUCT} from '../actions/types';

const initialState = {
  cart: [
    {
      id: 1,
      name: 'PS 4',
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };
    default:
      return state;
  }
};
