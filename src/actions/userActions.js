import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from './types';
import { auth, db, time } from '../utils/firebase';

export const registerUser = (user, password) => dispatch => {
  auth.createUserWithEmailAndPassword(user.email, password)
    .then(function (result) {
      db.collection('users').doc(user.username).set({
        email: user.email,
        following: [],
        followers: [],
        topics: [],
        username: user.username,
        isAuthenticated: true,
        displayName: user.displayName,
        photoUrl: user.photoUrl
      })

      user.isAuthenticated = true;
      localStorage.setItem('user', user.username);

      auth.onAuthStateChanged(function(user) {
        if (user) {
          user.sendEmailVerification().then(function() {
            // Email sent.
            console.log("email shouldve sent lmao");
          }).catch(function(error) {
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
            localStorage.setItem('user', user.username);

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

export const autoLoginUser = () => dispatch => {
  let username = localStorage.getItem('user');
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
      localStorage.setItem('user', user.username);

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
    db.collection('users').doc(user.username).set(user, { merge: true })
    dispatch({
        type: UPDATE_USER,
        payload: user
    });
};
