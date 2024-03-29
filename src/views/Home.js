/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Redirect } from "react-router-dom";
import { fetchPosts } from '../actions/postActions';
import { connect } from 'react-redux';

import {
  Row,
  Col,
} from "shards-react";

import NewPost from "./../components/blog/NewPost";
import Posts from "./Posts";
import DMList from "./DMList";

class Home extends React.Component {
  /* Main page, contains feed */
  render() {
    if (!localStorage.getItem('uid')) {
      return <Redirect to='/login' />
    }

    return (
      <Row>
        <Col lg="4" md="4" className="mx-auto mb-auto">
          <DMList />
        </Col>
        <Col lg="4" md="4" className="mx-auto mb-auto">
          <Posts />
        </Col>
        <Col lg="4" md="4" className="mx-auto mb-auto">
          <NewPost />
        </Col>
      </Row>
    )
  };
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { fetchPosts })(Home);
