import { UPLOAD_POST, FETCH_POSTS, DELETE_POST } from '../actions/types';

const initialState = [];

function postReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_POSTS:
      return payload
    case UPLOAD_POST:
      return [ payload, ...state ]
    case DELETE_POST:
      return state.filter(post => post !== payload)
    default:
      return state
  }
}

export default postReducer;