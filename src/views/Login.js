/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, db } from "../utils/firebase";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      redirectToHome: false
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
    console.log('email: ' + email);
    console.log('password: ' + password);

    auth.signInWithEmailAndPassword(email, password)
      .then(function (result) {
        db.collection('users').where('email', '==', this.state.email).get()
          .then(function(snapshot) {
            if (snapshot.empty) {
              // BIG ERROR OCCURED
            }

            snapshot.forEach(doc => {
              
              localStorage.setItem('user', doc.data().username);
            })
          })

        localStorage.setItem('user', result.user);

        this.setState({ redirectToHome: true });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    if (this.state.redirectToHome) {
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
                  alt="Shards Dashboards - Login Template"
                />

                {/* Title */}
                <h5 className="auth-form__title text-center mb-4">
                  Login
                </h5>

                {/* Form Fields */}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <FormInput onChange={this.handleChange}
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      autoComplete="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="password"
                      value={this.state.password}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme="accent"
                    className="d-table mx-auto"
                    type="submit"
                  >
                    Access Account
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
              <Link to="/register" className="ml-auto">
                Create a new account?
          </Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  };
};

export default Login;
