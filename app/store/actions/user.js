import {SAVE_USERDATA, USER_LOGGED} from './types';

export const saveUserData = userObj => ({
  type: 'SAVE_USERDATA',
  data: userObj,
});

export const isUserLogged = bool => ({
  type: 'USER_LOGGED',
  data: bool,
});
