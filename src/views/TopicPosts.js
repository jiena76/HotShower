/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import { fetchPostsByTopic } from '../actions/postActions';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from "shards-react";

import NewPost from "./../components/blog/NewPost";
import Posts from "./Posts";
import DMList from "./DMList";
import Home from './Home';

class TopicPosts extends React.Component {
  /* Main page, contains feed */
  render() {
    console.log(JSON.stringify(this.props.user));

    return (
    <Container fluid className="main-content-container h-100 px-4">
      <Row noGutters className="h-100">
        <Col lg="3" md="5" className="mx-auto mb-auto">
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
