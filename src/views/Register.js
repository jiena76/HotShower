/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { auth, db } from "../utils/firebase";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../actions/userActions';
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
      displayName: '',
      redirectToLogin: false,
      errorMessage: ''
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
    const { email, password, username, displayName } = this.state;

    let user = {
      email: email,
      following: [],
      followers: [],
      topics: [],
      displayName: displayName,
      username: username,
      photoUrl: 'https://media.licdn.com/dms/image/C5103AQHaon1-WBM-bQ/profile-displayphoto-shrink_100_100/0?e=1575504000&v=beta&t=P6kvQrDxobS1rHLQ7i9fHnLEsNjXVbZR-qjOiBa9SIE'
    };

    this.props.registerUser(user, password);
    this.setState({ redirectToLogin: true });
  }

  errorMessageField() {
    const { errorMessage } = this.state;
    
    if (errorMessage) {
      return <p>{errorMessage}</p>
    }
  }

  render() {
    if (this.props.user.isAuthenticated) {
      return <Redirect to="/" />
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="username">Username</label>
                    <FormInput onChange={this.handleChange}
                      type="text"
                      id="username"
                      value={this.state.username}
                      placeholder="Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="username">Display Name</label>
                    <FormInput onChange={this.handleChange}
                      type="text"
                      id="displayName"
                      value={this.state.displayName}
                      placeholder="Display Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="password"
                      value={this.state.password}
                      placeholder="Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password2">Confirm Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="confirmPassword"
                      value={this.state.confirmPassword}
                      placeholder="Confirm Password"
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

              {this.errorMessageField()}

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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { registerUser })(Register);
