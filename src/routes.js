import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "./utils/firebase";
import { logoutUser } from './actions/userActions';

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar, NoLayout } from "./layouts";

// Route Views
import UserProfile from "./views/UserProfile";
import EditUserProfile from "./views/EditUserProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import Main from "./views/Main";
import Home from "./views/Home";

function isSignedIn() {
  return localStorage.getItem('user') != null;
}

export default [
  {
    path: "/",
    exact: true,
    layout: HeaderNavigation,
    component: () => {
      return isSignedIn() ? <Main /> : <Home />
    }
  },
  {
    path: "/u/:username",
    layout: HeaderNavigation,
    component: UserProfile
  },
  {
    path: "/edit-user-profile",
    layout: HeaderNavigation,
    component: EditUserProfile
  },
  {
    path: "/login",
    layout: NoLayout,
    component: Login
  },
  {
    path: "/register",
    layout: NoLayout,
    component: Register
  },
  {
    path: "/forgot-password",
    layout: NoLayout,
    component: ForgotPassword
  },
  {
    path: "/change-password",
    layout: NoLayout,
    component: ChangePassword
  }
];
