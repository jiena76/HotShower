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

let isRelevantTopic = (topics1, topics2) => {
  let intersection = topics1.filter(function(topic) {
    return topics2.indexOf(topic) > -1;
  });
  console.log('intersection: ' + typeof(intersection));

  return Object.keys(intersection).length !== 0;
}


export const fetchPostsByTopics = () => dispatch => {

  db.collection('posts').orderBy('createdAt', 'desc').limit(100).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      console.log('hot shower')

      let posts = [];
      snapshot.forEach(doc => {
        if (isRelevantTopic(JSON.parse(localStorage.getItem('user')).topics, doc.data().topics))
        posts.push(doc.data());
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};

export const fetchPostsByTopic = (query) => dispatch => {
  query = query.toLowerCase().replace(/\s/g, '');
  let collection = query === 'liked' ? db.collection('posts').where('likes', 'array-contains', localStorage.getItem('uid')) :
                                       db.collection('posts').where('topics', 'array-contains', query);

                                       console.log('hot shower')

  collection.orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }
      console.log('hot shower')

      let posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    }.bind(dispatch))
    .catch(function(error) {
      console.log(error)
    });
};

export const likePost = (post) => {
  const { author, createdAt, text, likes } = post;
  if (likes.indexOf(localStorage.getItem('uid')) === -1) {
    likes.push(localStorage.getItem('uid'));
  }
  console.log('hot shower')


  db.collection('posts').where('author', '==', author)
    .where('createdAt', '==', createdAt)
    .where('text', '==', text).get()
    .then(snapshot => {
      console.log('hot shower')

      snapshot.forEach(doc => {
        console.log('hehe')
        db.collection('posts').doc(doc.id).set({
          likes: likes
        }, { merge: true })
      })
    })
};

export const uploadPost = (text, topics) => dispatch => {
  let user = JSON.parse(localStorage.getItem('user'))

  topics = topics.map(function (topic) {
    return topic.toLowerCase().replace(/\s/g, '');
  })


  let post = {
    text: text,
    displayName: user.displayName,
    author: user.username,
    authorPic: user.photoUrl,
    createdAt: time.now().toDate(),
    topics: topics,
    likes: [user.username]
  };

  db.collection('posts').add(post);


  dispatch({
    type: UPLOAD_POST,
    payload: post
  })
};
