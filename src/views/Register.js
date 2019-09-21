/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { auth } from "../utils/firebase";
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
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    console.log("state: " + JSON.stringify(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        console.log(JSON.stringify(result));
        /*
        {"user":{"uid":"erTIjKjydJUBFxPtsIxDvCDpnXg2","displayName":null,"photoURL":null,"email":"olao@purdue.edu","emailVerified":false,"phoneNumber":null,"isAnonymous":false,"tenantId":null,"providerData":[{"uid":"olao@purdue.edu","displayName":null,"photoURL":null,"email":"olao@purdue.edu","phoneNumber":null,"providerId":"password"}],"apiKey":"AIzaSyBOVlpd1oOa0koRMjT6JcxuhSBjgkCL3bc","appName":"[DEFAULT]","authDomain":"hot-shower.firebaseapp.com","stsTokenManager":{"apiKey":"AIzaSyBOVlpd1oOa0koRMjT6JcxuhSBjgkCL3bc","refreshToken":"AEu4IL0OqRW13Bb5R33x0dm2WXab-7OCk5FoJNbIDJXLDzkOFyPnQP00WwfX8CWm0ZdtXeQgNe1OG1y-YG_scHA-oAnh70VEFPZLmbCC0_-koWjJsKCJc8kYLB3_drquiNGgDtuQSY0S-T_pS-4R6N5OLY_qQMRH_zHL8b7VMKWDc6bDBlo2wNnf8pN-eFEmtr6b4hAJQD1N","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMjc0MWQ0MWY5ZDQzZmFiMWU2MjhhODVlZmI0MmE4OGVmMzIyOWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG90LXNob3dlciIsImF1ZCI6ImhvdC1zaG93ZXIiLCJhdXRoX3RpbWUiOjE1NjkwOTUwNzEsInVzZXJfaWQiOiJlclRJaktqeWRKVUJGeFB0c0l4RHZDRHBuWGcyIiwic3ViIjoiZXJUSWpLanlkSlVCRnhQdHNJeER2Q0RwblhnMiIsImlhdCI6MTU2OTA5NTA3MSwiZXhwIjoxNTY5MDk4NjcxLCJlbWFpbCI6Im9sYW9AcHVyZHVlLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJvbGFvQHB1cmR1ZS5lZHUiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.gNfLVC3Ra7EdbQPi-C_BUyjxvLdqEBV-9sjsig10Dj366NZPW7LEE_W7qqEhYmyNi_phlzXsw_prnoXvlvm-a6lTdhj3TzDnKLrCYt0Y_FQqbP2cpi-B5wPNTSBfnN8sRJCCVv70-fB4FdJdfq1FSOC6wRiT31nWk-BSiCQrfFx50Zy0mxnyRZUtqY2pG31zgT4xQ1EKeQS85V0Ze9jQqDMMZLJVdoEc8ThL7iiAQnQo0TYL5fuFpPaQpTTQE-WGZOGOH6m-aswJEP7ZdkShcXXLdVIV6VaQ59tGCOxeXvZsZKy6iScUFkRjc70NIJBUhnZUFh36954tIU8tb41ijQ","expirationTime":1569098671681},"redirectEventId":null,"lastLoginAt":"1569095071388","createdAt":"1569095071388"},"credential":null,"additionalUserInfo":{"providerId":"password","isNewUser":true},"operationType":"signIn"}
        */
      })
      .catch(function (error) {
  
      })
  }

  render() {

    const { username, password, confirmPassword } = this.state;
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
                      value={username}
                      placeholder="Username"
                      autoComplete="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="password"
                      value={password}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password2">Confirm Password</label>
                    <FormInput onChange={this.handleChange}
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormCheckbox>
                      I agree with the <a href="#">Terms & Conditions</a>.
                </FormCheckbox>
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
