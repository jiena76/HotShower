import { UPLOAD_POST, FETCH_POSTS, DELETE_POST } from './types';
import { db, time, FieldValue } from '../utils/firebase';

export const fetchPosts = () => dispatch => {

  db.collection('posts').orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {

      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        posts.push({ ...doc.data(), docID: doc.id });
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};

let isRelevantTopic = (topics1, topics2) => {
  let intersection = topics1.filter(function (topic) {
    return topics2.indexOf(topic) > -1;
  });
  // console.log('intersection: ' + typeof(intersection));

  return Object.keys(intersection).length !== 0;
}

let isAuthorUser = (author) => {
  return author === JSON.parse(localStorage.getItem('user')).username;
}

export const fetchPostsByUser = (user) => dispatch => {

  db.collection('posts')
    .where('author', '==', user)
    .orderBy('createdAt', 'desc').limit(100).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        if (isRelevantTopic(JSON.parse(localStorage.getItem('user')).topics, doc.data().topics)
          || isAuthorUser(doc.data().author))
          posts.push({ ...doc.data(), docID: doc.id });
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};


export const fetchPostsByTopics = () => dispatch => {

  db.collection('posts').orderBy('createdAt', 'desc').limit(100).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        if (isRelevantTopic(JSON.parse(localStorage.getItem('user')).topics, doc.data().topics)
          || isAuthorUser(doc.data().author))
          posts.push({ ...doc.data(), docID: doc.id });
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
        posts.push({ ...doc.data(), docID: doc.id });
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    }.bind(dispatch))
    .catch(function (error) {
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

  db.collection('posts').add(post)
    .then(function (docRef) {
      // update collections/topics when new post created
      db.collection("collection").doc("topics").get().then(function (doc) {
        let DB_topics = db.collection("collection").doc("topics");
        let topicsInDB = doc.data().topics;

        topics.forEach(function (topic) {
          topic = topic.toLowerCase().replace(/\s/g, '');
          if (topicsInDB.indexOf(topic) === -1) {
            DB_topics.update({
              topics: FieldValue.arrayUnion(topic),
              [topic]: FieldValue.arrayUnion(docRef)
            });
          }
          else {
            DB_topics.update({
              [topic]: FieldValue.arrayUnion(docRef)
            });
          }
        });
      });
    });

  dispatch({
    type: UPLOAD_POST,
    payload: post
  })
};

// TODO: Deleting a post that have been just added to the timeline causes an error
export const deletePost = (post) => {
  let postRef = db.collection('posts').doc(post.docID);
  console.log("Delete " + post.docID);
  if (post.topics.length > 0) {
    let DB_topics = db.collection("collection").doc("topics");
    post.topics.forEach(function (topic) {
      // remove document reference from this topic
      DB_topics.update({ [topic]: FieldValue.arrayRemove(postRef) })
        .then(function () {
          // if no more post under same topic exist,
          // delete this topic from the collection and topics array
          DB_topics.get().then(function (doc) {
            console.log(doc.data()[topic]);
            if (doc.data()[topic].length === 0) {
              DB_topics.update({
                [topic]: FieldValue.delete(),
                topics: FieldValue.arrayRemove(topic),
              });
            }
          });
        })
        .catch(function (error) {
          console.error("Error while removing this topic: [" + topic + "], ", error);
        });
    });
  }

  // delete the post
  postRef.delete();

  // TODO: I can't get this to work
  // dispatch({
  //   type: DELETE_POST,
  //   payload: post
  // })
};
