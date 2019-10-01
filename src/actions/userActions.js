import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from './types';
import { auth, db, time } from '../utils/firebase';

export const registerUser = (user, password) => dispatch => {
  auth.createUserWithEmailAndPassword(user.email, password)
    .then(function (result) {
      db.collection('users').doc(user.username).set({
        email: user.email,
        following: [],
        followers: [],
        topics: [],
        username: user.username
      })

      user.isAuthenticated = true;
      localStorage.setItem('user', user.username);

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
            // BIG ERROR OCCURED
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

export const autoLoginUser = (username) => dispatch => {

  if (!username) {
    localStorage.clear();
    return;
  }

  db.collection('users').doc(username).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        localStorage.clear();
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
    }.this(dispatch))
};

export const logoutUser = () => dispatch => {
  auth.signOut();;
  localStorage.clear();
  let user = {
    isAuthenticated: false
  }

  dispatch({
    type: LOGOUT_USER,
    payload: user
  })
};
