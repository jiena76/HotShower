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

export const fetchPostsByTopic = (query) => dispatch => {
  console.log('query: ' + query)
  db.collection('posts').where('topics', 'array-contains', query).orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        console.log(doc.data().topics);

          posts.push(doc.data());
      })

      console.log(posts);

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    }.bind(dispatch));
};

export const uploadPost = (text, topics) => dispatch => {
  let post = {
    text: text,
    author: localStorage.getItem('user'),
    createdAt: time.now().toDate(),
    topics: topics,
  };

  db.collection('posts').add(post);

  dispatch({
    type: UPLOAD_POST,
    payload: post
  })
};
