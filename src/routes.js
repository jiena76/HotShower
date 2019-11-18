import { HeaderNavigation, NoLayout } from "./layouts";

// Route Views
import UserProfile from "./views/UserProfile";
import EditUserProfile from "./views/EditUserProfile";
import TopicPosts from './views/TopicPosts';
import Login from "./views/Login";
import Register from "./views/Register";
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
    private: true,
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

