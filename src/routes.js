import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, HeaderNavigation, IconSidebar } from "./layouts";

// Route Views
import Analytics from "./views/Analytics";
import OnlineStore from "./views/OnlineStore";
import BlogOverview from "./views/BlogOverview";
import UserProfile from "./views/UserProfile";
import UserProfileLite from "./views/UserProfileLite";
import EditUserProfile from "./views/EditUserProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";
import FileManagerList from "./views/FileManagerList";
import FileManagerCards from "./views/FileManagerCards";
import TransactionHistory from "./views/TransactionHistory";
import Calendar from "./views/Calendar";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import HeaderNav from "./views/HeaderNavigation";
import IconSidebarView from "./views/IconSidebar";

const BlankIconSidebarLayout = ({ children }) => (
  <IconSidebar noNavbar noFooter>
    {children}
  </IconSidebar>
);

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/analytics" />
  },
  {
    path: "/analytics",
    layout: DefaultLayout,
    component: Analytics
  },
  {
    path: "/ecommerce",
    layout: DefaultLayout,
    component: OnlineStore
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/edit-user-profile",
    layout: DefaultLayout,
    component: EditUserProfile
  },
  {
    path: "/login",
    layout: BlankIconSidebarLayout,
    component: Login
  },
  {
    path: "/register",
    layout: BlankIconSidebarLayout,
    component: Register
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
    path: "/file-manager-list",
    layout: DefaultLayout,
    component: FileManagerList
  },
  {
    path: "/file-manager-cards",
    layout: DefaultLayout,
    component: FileManagerCards
  },
  {
    path: "/transaction-history",
    layout: DefaultLayout,
    component: TransactionHistory
  },
  {
    path: "/calendar",
    layout: DefaultLayout,
    component: Calendar
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: BlankIconSidebarLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/header-navigation",
    layout: HeaderNavigation,
    component: HeaderNav
  },
  {
    path: "/icon-sidebar-nav",
    layout: IconSidebar,
    component: IconSidebarView
  }
];
