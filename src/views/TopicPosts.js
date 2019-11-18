/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { fetchPostsByTopic } from '../actions/postActions';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
} from "shards-react";

import Posts from "./Posts";

class TopicPosts extends React.Component {
  /* Main page, contains feed */
  render() {
    return (
    <Container fluid className="main-content-container h-100 px-4">
      <Row noGutters className="h-100">
        <Col lg="3" md="5" className="mx-auto mb-auto">
          <h3>{this.props.match.params.topic}</h3>
          <br></br>
          <Posts topic={this.props.match.params.topic}/>
        </Col>
      </Row>
    </Container>
    )
  };
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { fetchPostsByTopic })(TopicPosts);
