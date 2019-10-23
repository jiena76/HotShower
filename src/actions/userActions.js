import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from './types';
import { auth, db, time } from '../utils/firebase';

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
              topics: ["hotshower"],
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
          })
      }
    }.bind(this))
};

export const loginUser = (email, password) => dispatch => {
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
  if (following.indexOf(userToBeFollowed) !== -1) {
    return;
  }

  following.push(userToBeFollowed);
  user.following = following;
  localStorage.setItem('user', JSON.stringify(user));

  console.log(following)
  await db.collection('users').doc(username).set({
    following: following
  }, { merge: true })
}

export const unfollowUser = (userToBeUnfollowed) => async dispatch => {
  console.log(userToBeUnfollowed);
  let user = JSON.parse(localStorage.getItem('user'));
  const { following, username } = user;
  let index = following.indexOf(userToBeUnfollowed);
  if (index === -1) {
    return;
  }

  following.splice(index, 1);
  user.following = following;
  localStorage.setItem('user', JSON.stringify(user));

  console.log(following)
  db.collection('users').doc(username).set({
    following: following
  }, { merge: true })
}

export const autoLoginUser = () => dispatch => {
  let username = localStorage.getItem('uid');
  if (!username) {
    localStorage.clear();
    console.log('clear');
    return;
  }

  db.collection('users').doc(username).get()
    .then(function (doc) {
      if (!doc.exists) {
        localStorage.clear();
        console.log('clear');
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
    }.bind(dispatch));
};

export const logoutUser = () => dispatch => {
  auth.signOut();
  localStorage.clear();
  console.log('clear');
  let user = {
    isAuthenticated: false
  }

  dispatch({
    type: LOGOUT_USER,
    payload: user
  })
};

export const updateUser = (user) => dispatch => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('uid', user.username)
  db.collection('users').doc(user.username).set(user, { merge: true })
  dispatch({
    type: UPDATE_USER,
    payload: user
  });
};

export const deleteUser = () => dispatch => {
  let user = localStorage.getItem('uid');
  localStorage.clear();

  db.collection('posts').where('author', '==', user).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      db.collection('posts').doc(doc.id).delete();
    })
  })

  db.collection('users').doc('user').delete();

  auth.currentUser.delete().then(function() {
    console.log('user deleted');
  }).catch(function(error) {
    console.log(error);
  })
}
