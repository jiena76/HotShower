import React from "react";
import { Container, Row, Col } from "shards-react";
import { combineReducers, createStore } from 'redux';

import UserDetails from "./../components/user-profile/UserDetails";
import DMList from "./DMList";
import DMWidget from "./DMWidget";

class UserProfile extends React.Component {
  getDMWidget() {
    if (this.props.match.params.username !== localStorage.getItem('uid')) {
      return <Col md="4"><DMWidget username={this.props.match.params.username} /></Col>
    }
    else {
      return <div></div>
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="mt-4">
          <Col className="mx-auto" md="8">
            <UserDetails username={this.props.match.params.username} />
          </Col>
          
            { this.getDMWidget() }
        </Row>
      </Container>
    )
  }
};

export default UserProfile;
