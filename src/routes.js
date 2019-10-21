import React from "react";
import { Redirect, Route } from "react-router-dom";
import { auth } from "./utils/firebase";
import { connect } from 'react-redux';
import { logoutUser } from './actions/userActions';

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar, NoLayout } from "./layouts";

// Route Views
import UserProfile from "./views/UserProfile";
import EditUserProfile from "./views/EditUserProfile";
import TopicPosts from './views/TopicPosts';
import Login from "./views/Login";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import Home from "./views/Home";
import Logout from './views/Logout'


export default [
  {
    path: "/",
    exact: true,
    private: true,
    layout: HeaderNavigation,
    component: Home
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: "/u/:username",
    private: true,
    layout: HeaderNavigation,
    component: UserProfile
  },
  {
    path: "/t/:topic",
    layout: HeaderNavigation,
    component: TopicPosts
  },
  {
    path: "/edit-profile",
    private: true,
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
  }
];

