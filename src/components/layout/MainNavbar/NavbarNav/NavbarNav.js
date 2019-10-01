import React from "react";
import { Nav } from "shards-react";

import Messages from "./Messages";
import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Messages />
    <Notifications />
    <UserActions />
  </Nav>
);
