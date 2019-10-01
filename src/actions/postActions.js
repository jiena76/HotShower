import { UPLOAD_POST, FETCH_POSTS } from './types';
import { db, time } from '../utils/firebase';

export const fetchPosts = () => dispatch => {
  db.collection('posts').orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};

export const uploadPost = (text) => dispatch => {
  let post = {
    text: text,
    author: localStorage.getItem('user'),
    createdAt: time.now().toDate(),
  };

  db.collection('posts').add(post);

  dispatch({
    type: UPLOAD_POST,
    payload: post
  })
};
