/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link, Redirect } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import { fetchPosts } from '../actions/postActions';
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

class Home extends React.Component {
  /* Main page, contains feed */
  render() {
    console.log(JSON.stringify(this.props.user));


    if (!localStorage.getItem('user')) {
      return <Redirect to='/login' />
    }

    return (
    <Container fluid className="main-content-container h-100 px-4">
      <Row noGutters className="h-100">
        <Col lg="3" md="3" className="mx-auto mb-auto">
          <br></br>
          <DMList />
        </Col>
        <Col lg="3" md="5" className="mx-auto mb-auto">
          <br></br>
          <NewPost />
          <br></br>
          <Posts />
        </Col>
      </Row>
    </Container>
    )
  };
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { fetchPosts } )(Home);
