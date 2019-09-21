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

const Home = () => (
  /* Main page, contains feed */

  <Container fluid className="main-content-container h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="auth-form mx-auto my-auto">
        <Card>
          <CardBody>
            {/* Logo */}
            <img
              className="auth-form__logo d-table mx-auto mb-3"
              src={require("../images/shards-dashboards-logo.svg")}
              alt="Shards Dashboards - Login Template"
            />

            {/* Title */}
            <h5 className="auth-form__title text-center mb-4">
              Not Twitter
            </h5>

            {/* Form Fields */}
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                Log In
              </Button>

              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                Sign Up
              </Button>
          </CardBody>

          {/* Social Icons */}
          <CardFooter>
            <ul className="auth-form__social-icons d-table mx-auto">
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-github" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
            </ul>
          </CardFooter>
        </Card>

        {/* Meta Details */}
        <div className="auth-form__meta d-flex mt-4">
          <Link to="/forgot-password">Forgot your password?</Link>
          <Link to="/register" className="ml-auto">
            Create a new account?
          </Link>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Home;
