import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_USER:
      return payload
    case LOGIN_USER:
      return payload
    case LOGOUT_USER:
      return payload
    case UPDATE_USER:
      Object.keys(payload).forEach(function (key) {
        state[key] = payload[key];
      })
      return state
    default:
      return state
  }
}

export default userReducer;
