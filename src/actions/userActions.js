import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from './types';
import { auth, db, FieldValue } from '../utils/firebase';

export const registerUser = (user, password) => dispatch => {
  db.collection('users').doc(user.username).get()
    .then(function (doc) {
      if (!doc.exists) {
        auth.createUserWithEmailAndPassword(user.email, password)
          .then(function (result) {
            db.collection('users').doc(user.username).set({
              email: user.email,
              following: [],
              followers: [],
              bio: user.bio,
              topics: user.topics,
              username: user.username,
              isAuthenticated: true,
              displayName: user.displayName,
              photoUrl: user.photoUrl
            })

            user.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('uid', user.username)
            auth.onAuthStateChanged(function (user) {
              if (user) {
                user.sendEmailVerification().then(function () {
                  // Email sent.
                  console.log("email shouldve sent lmao");
                }).catch(function (error) {
                  // An error happened.
                });
              } else {
                console.log("try again boi");
              }
            });

            dispatch({
              type: REGISTER_USER,
              payload: user
            })

          }.bind(dispatch, user))
          .catch(function (error) {
            console.log(error);
            console.log('email taken')
            localStorage.setItem('user', 'email_taken');
          })
      }
      else {
          console.log('username taken')
          localStorage.setItem('user', 'username_taken');
      }
    })
};

export const loginUser = (email, password) => dispatch => {
  console.log('login')

  auth.signInWithEmailAndPassword(email, password)
    .then(function (result) {
      db.collection('users').where('email', '==', email).get()
        .then(function (snapshot) {

          if (snapshot.empty) {

          }

          snapshot.forEach(doc => {

            let user = doc.data();
            user.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('uid', user.username)
            dispatch({
              type: LOGIN_USER,
              payload: user
            })
          })
        })
    }.bind(dispatch, email, password))
    .catch(function (error) {
      console.log(error);
    })
};

export const followUser = (userToBeFollowed) => async dispatch => {
  console.log(userToBeFollowed);
  
  let user = JSON.parse(localStorage.getItem('user'));
  const { following, username } = user;

  // user already followed
  if (following.indexOf(userToBeFollowed) !== -1) {
    return;
  }

  // push to local
  following.push(userToBeFollowed);
  user.following = following;
  localStorage.setItem('user', JSON.stringify(user));

  // push to DB: users/:username/following/:userToBeFollowed
  await db.collection('users').doc(username).update({
    following: FieldValue.arrayUnion(userToBeFollowed)
  });

  // push to DB: collection/:username/:userToBeFollowed
  const DB_following = db.collection("collection").doc(username);
  await DB_following.get().then(function (doc) {
    DB_following.update({ 
      [userToBeFollowed]: FieldValue.arrayUnion("all")
    }).catch(function (error) {
      console.error("Error while following: [" + userToBeFollowed + "], ", error);
    })
  });
}

export const unfollowUser = (userToBeUnfollowed) => async dispatch => {
  let user = JSON.parse(localStorage.getItem('user'));
  const { following, username } = user;
  let index = following.indexOf(userToBeUnfollowed);
  // already unfollowing user
  if (index === -1) {
    return;
  }

  // remove from local
  following.splice(index, 1);
  user.following = following;
  localStorage.setItem('user', JSON.stringify(user));

  // remove from DB: users/:username/following/:userToBeUnfollowed
  await db.collection('users').doc(username).update({
    following: FieldValue.arrayRemove(userToBeUnfollowed)
  });

  // remove from DB: collection/:username/:userToBeUnfollowed
  const DB_following = db.collection("collection").doc(username);
  await DB_following.get().then(function (doc) {
    DB_following.update({
      [userToBeUnfollowed]: FieldValue.delete() 
    }).catch(function (error) {
      console.error("Error while unfollowing: [" + userToBeUnfollowed + "], ", error);
    })
  });
}

export const followUserTopic = (author, topic) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const { following, username } = user;
  // user is not following author
  if (following.indexOf(author) === -1) {
    // follow author
    followUser(author);
  }

  topic = topic.toLowerCase().replace(/\s/g, '');
  const DB_following = db.collection("collection").doc(username);
  DB_following.get().then(function (doc) {
    const authorTopics = doc.data()[author];
    // remove "all," default topic when user first gets followed
    if(authorTopics.length === 1 && authorTopics[0] === "all"){
      DB_following.update({
        [author]: FieldValue.arrayRemove("all")
      });
    }
    // add topic
    if(doc.data()[author].indexOf(topic) === -1){
      DB_following.update({
        [author]: FieldValue.arrayUnion(topic)
      });
    }
  });

  // dispatch({
  //   type: UPDATE_USER,
  //   payload: user
  // });
}

export const unfollowUserTopic = (author, topic) => {
  let user = JSON.parse(localStorage.getItem('user'));
  const { following, username } = user;
  // user is not following author
  if (following.indexOf(author) === -1) {
    return;
  }

  topic = topic.toLowerCase().replace(/\s/g, '');
  const DB_following = db.collection("collection").doc(username);
  DB_following.get().then(function (doc) {
    const authorTopics = doc.data()[author];
    if(!authorTopics)
      return;

    // remove topic
    if(doc.data()[author].indexOf(topic) !== -1){
      DB_following.update({
        [author]: FieldValue.arrayRemove(topic)
      });
    }
  });

  // dispatch({
  //   type: UPDATE_USER,
  //   payload: user
  // });
}

export const autoLoginUser = () => dispatch => {
  console.log('auto logging in')
  let username = localStorage.getItem('uid');
  if (!username) {
    localStorage.clear();
    return;
  }

  db.collection('users').doc(username).get()
    .then(function (doc) {
      if (!doc.exists) {
        localStorage.clear();
        return;
      }

      let user = doc.data();
      user.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('uid', user.username)

      dispatch({
        type: LOGIN_USER,
        payload: user
      })
    });
};

export const logoutUser = () => dispatch => {
  auth.signOut();
  localStorage.clear();
  let user = {
    isAuthenticated: false
  }

  dispatch({
    type: LOGOUT_USER,
    payload: user
  })
};

export const updateUser = (user) => dispatch => {
  db.collection('users').doc(user.username).set(user, { merge: true })
  dispatch({
    type: UPDATE_USER,
    payload: user
  });
};

export const addTopics = (topics) => dispatch => {
  let user = JSON.parse(localStorage.getItem('user'));
  topics.forEach(function(topic) {
    topic = topic.toLowerCase().replace(/\s/g, '');
    if (user.topics.indexOf(topic) === -1) {
      user.topics.push(topic);
    }
  })

  db.collection('users').doc(user.username).set(user, { merge: true })
  dispatch({
    type: UPDATE_USER,
    payload: user
  });
}

export const deleteUser = () => dispatch => {
  let user = localStorage.getItem('uid');
  localStorage.clear();

  db.collection('posts').where('author', '==', user).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      db.collection('posts').doc(doc.id).delete();
    })
  })
  
  db.collection('conversations').where('participants', 'array-contains', user).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      db.collection('conversations').doc(doc.id).delete();
    })
  })

  db.collection('users').doc(user).delete();

  auth.currentUser.delete().then(function() {
    console.log('user deleted');
  }).catch(function(error) {
    console.log(error);
  })

  user = {
    isAuthenticated: false
  }

  dispatch({
    type: LOGOUT_USER,
    payload: user
  })
}
