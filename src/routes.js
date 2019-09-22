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
import HeaderNav from "./views/HeaderNavigation";
import Home from "./views/Home";
import Feed from "./views/Feed";

const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

function isSignedIn() {
  return localStorage.getItem('uid') != null;
}

export default [
  {
    path: "/",
    exact: true,
    layout: HeaderNavigation,
    component: () => {
      return isSignedIn() ? <Feed /> : <Home />
    }
  },
  {
    path: "/logout",
    exact: true,
    layout: NoLayout,
    component: () => {
      localStorage.clear();
      return <Redirect to='/login' />
    }
  },
  {
    path: "/overview",
    layout: NoLayout,
    component: ComponentsOverview
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/u/:username",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/edit-user-profile",
    layout: DefaultLayout,
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
    layout: BlankIconSidebarLayout,
    component: () => {
      return !isSignedIn() ? <Register /> : <Redirect to="/" />
    }
  },
  {
    path: "/forgot-password",
    layout: BlankIconSidebarLayout,
    component: ForgotPassword
  },
  {
    path: "/change-password",
    layout: BlankIconSidebarLayout,
    component: ChangePassword
  },
  {
    path: "/header-navigation",
    layout: HeaderNavigation,
    component: HeaderNav
  }
];
