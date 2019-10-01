import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';

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
    default:
      return state
  }
}

export default userReducer;