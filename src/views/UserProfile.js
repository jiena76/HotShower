import React from "react";
import { Container, Row, Col } from "shards-react";

import UserDetails from "./../components/user-profile/UserDetails";
import UserContact from "./../components/user-profile/UserContact";
import UserTeams from "./../components/user-profile/UserTeams";
import UserStats from "./../components/user-profile/UserStats";
import UserPerformance from "./../components/user-profile/UserPerformance";
import UserActivity from "./../components/user-profile/UserActivity";

const UserProfile = () => (
  <Container fluid className="main-content-container px-4">
    <Row className="mt-4">
      <Col lg="4" sm="12">
        <UserDetails />
        <UserContact />
        <UserTeams />
      </Col>
      <Col lg="8">
        <UserStats />
        <UserPerformance />
        <UserActivity />
      </Col>
    </Row>
  </Container>
);

export default UserProfile;
