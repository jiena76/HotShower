import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "./utils/firebase";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar, NoLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfile from "./views/UserProfile";
import EditUserProfile from "./views/EditUserProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import ComponentsOverview from "./views/ComponentsOverview";
import Main from "./views/Main";
import Home from "./views/Home";
import Feed from "./views/Feed";

const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

function isSignedIn() {
  return localStorage.getItem('user') != null;
}

export default [
  {
    path: "/",
    exact: true,
    layout: isSignedIn() ? HeaderNavigation : NoLayout,
    component: () => {
      return isSignedIn() ? <Main /> : <Home />
    }
  },
  {
    path: "/logout",
    exact: true,
    layout: NoLayout,
    component: () => {
      localStorage.clear();
      return <Redirect to='/' />
    }
  },
  // {
  //   path: "/overview",
  //   layout: isSignedIn() ? HeaderNavigation : NoLayout,
  //   component: ComponentsOverview
  // },
  // {
  //   path: "/blog-overview",
  //   layout: isSignedIn() ? HeaderNavigation : NoLayout,
  //   component: BlogOverview
  // },
  {
    path: "/u/:username",
    layout: isSignedIn() ? HeaderNavigation : NoLayout,
    component: UserProfile
  },
  {
    path: "/edit-user-profile",
    layout: isSignedIn() ? HeaderNavigation : NoLayout,
    component: EditUserProfile
  },
  {
    path: "/login",
    layout: NoLayout,
    component: () => {
      return !isSignedIn() ? <Login /> : <Redirect to="/" />
    }
  },
  {
    path: "/register",
    layout: NoLayout,
    component: () => {
      return !isSignedIn() ? <Register /> : <Redirect to="/" />
    }
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
