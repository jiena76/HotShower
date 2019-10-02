import React from "react";
import { Container, Row, Col } from "shards-react";
import { combineReducers, createStore } from 'redux';

import UserDetails from "./../components/user-profile/UserDetails";
import DMList from "./DMList"

class UserProfile extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4">
              <Row className="mt-4">
                <Col className="mx-auto">
                  <UserDetails />
                </Col>
              </Row>
            </Container>
        )
    }
};

export default UserProfile;
