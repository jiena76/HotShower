/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { auth, db } from "../utils/firebase";
import { Redirect, Link } from "react-router-dom";
import { isThisISOWeek } from "date-fns/esm";
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


class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      redirectToLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log('hello');
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        const{ email, username } = this.state;

        db.collection('users').doc(username).set({
          email: email,
          following: [],
          followers: [],
          topics: [],
          username: username
        })

       this.setState({ redirectToLogin: true });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />
    }

    return (
      <Container fluid className="main-content-container h-100 px-4">
        <Row noGutters className="h-100">
          <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/shards-dashboards-logo.svg")}
                  alt="Shards Dashboards - Register Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Create New Account
            </h5>

                {/* Form Fields */}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <label htmlFor="email">Email address</label>
                    <FormInput onChange={this.handleChange}
                      type="email"
                      id="email"
                      placeholder="Email address"
                      autoComplete="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="username">Username</label>
                    <FormInput onChange={this.handleChange}
                      type="text"
                      id="username"
                      value={this.state.username}
                      placeholder="Username"
                      autoComplete="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="password"
                      value={this.state.password}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password2">Confirm Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="confirmPassword"
                      value={this.state.confirmPassword}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                  >
                    Create Account
              </Button>
                </Form>
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
              <Link to="/login" className="ml-auto">
                Sign In?
          </Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  };
};

export default Register;
