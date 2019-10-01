import React from "react";
import { Container, Row, Col } from "shards-react";

import UserDetails from "./../components/user-profile/UserDetails";
import UserContact from "./../components/user-profile/UserContact";
import UserTeams from "./../components/user-profile/UserTeams";
import UserStats from "./../components/user-profile/UserStats";
import UserPerformance from "./../components/user-profile/UserPerformance";
import UserActivity from "./../components/user-profile/UserActivity";
import Feed from "./Feed";

class UserProfile extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4">
              <Row className="mt-4">
              <UserDetails />

              <Col lg="4" sm="12">
              <UserTeams />
                <UserContact />
              </Col>
              </Row>
            </Container>
        )
    }
};

export default UserProfile;
