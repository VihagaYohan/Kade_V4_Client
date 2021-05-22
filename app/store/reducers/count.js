import {INCREMENT, DECREMENT} from '../actions/types';

const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.data,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - action.data,
      };
    default:
      return state;
  }
};
