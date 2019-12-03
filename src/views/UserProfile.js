import React from "react";
import { Container, Row, Col } from "shards-react";
import { fetchPostsByUser } from "../actions/postActions"
import { connect } from 'react-redux';

import UserDetails from "./../components/user-profile/UserDetails";
import DMWidget from "./DMWidget";
import Posts from "./Posts";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    fetchPostsByUser(this.props.match.params.username);
  }

  getDMWidget() {
    const { following } = JSON.parse(localStorage.getItem('user'));


    if (this.props.match.params.username !== localStorage.getItem('uid') && following.indexOf(this.props.match.params.username) !== -1) {
      return (
        <Col className="mx-auto" md="4">
          <DMWidget username={this.props.match.params.username} />
        </Col>
      )
    }
    else {
      return <div></div>
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row className="mt-4">
          <Col className="mx-auto" md="4">
            <UserDetails username={this.props.match.params.username} />
          </Col>
          <Col className="mx-auto" md="4">
            <Posts user={this.props.match.params.username} />
          </Col>
          {this.getDMWidget()}
        </Row>
        <Row>
          <Col className="mx-auto" md="4" >
          </Col>
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { fetchPostsByUser })(UserProfile);

