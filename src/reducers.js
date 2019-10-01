import { combineReducers } from 'redux';
import postReducer from './reducers/postReducer';

export default combineReducers({
  posts: postReducer
})