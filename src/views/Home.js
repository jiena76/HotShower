/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
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
import NavbarSearch from "./../components/layout/MainNavbar/NavbarSearch";

const Home = () => (
  /* Home page, welcomes users */
  <Container fluid className="main-content-container h-100 px-4">
    <Row noGutters className="my-5">
      <Col lg="3" md="5" className="mx-auto my-auto text-center">
        <h5>Hot Shower</h5>
        <NavbarSearch />
      </Col>
    </Row>
    <Row noGutters>
      <Col lg="3" md="5" className="mx-auto my-auto text-center">
        <div className="btn-group" >
          <Link className="btn btn-primary btn-pill" to="/login">Login</Link>
          <Link className="btn btn-primary btn-pill" to="/register">Register</Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Home;
