import { UPLOAD_POST, FETCH_POSTS } from '../actions/types';

const initialState = [];

function postReducer(state = initialState, { type, payload}) {
  switch (type) {
    case FETCH_POSTS:
      return payload
    case UPLOAD_POST:
      return [ payload, ...state ]
    default:
      return state
  }
}

export default postReducer;