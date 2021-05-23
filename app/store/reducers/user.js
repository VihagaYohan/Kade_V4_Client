import {SAVE_USERDATA, USER_LOGGED} from '../actions/types';

const initialState = {
  user: {
    userId: undefined,
    accountName: undefined,
    password: undefined,
    token: undefined,
  },
  userLogged: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USERDATA':
      const user = action.data;
      return {
        ...state,
        user: user,
      };
    case 'USER_LOGGED':
      const isLogged = action.data;
      return {
        ...state,
        userLogged: isLogged,
      };
    default:
      return state;
  }
};
