import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import mainReducer from './reducers/count';
import addCart from './reducers/cart';
import user from './reducers/user';

const rootReducer = combineReducers({
  count: mainReducer,
  cart: addCart,
  user: user,
});

const configureStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default configureStore;
