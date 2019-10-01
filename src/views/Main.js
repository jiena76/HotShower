/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
import { combineReducers, createStore } from 'redux';

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

const Main = () => (
  /* Main page, contains feed */

  <Container fluid className="main-content-container h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="3" className="mx-auto mb-auto">
        <br></br>
        <DMList/>
      </Col>
      <Col lg="3" md="5" className="mx-auto mb-auto">
        <br></br>
        <NewPost />
        <br></br>
        <Posts />
      </Col>
    </Row>
  </Container>
);

export default Main;
