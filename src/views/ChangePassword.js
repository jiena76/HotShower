import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";

const ChangePassword = () => (
  <Container fluid className="main-content-container h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="auth-form mx-auto my-auto">
        <Card>
          <CardBody>
            {/* Logo */}
            <img
              className="auth-form__logo d-table mx-auto mb-3"
              src={require("../images/shards-dashboards-logo.svg")}
              alt="Shards Dashboards - Change Password Template"
            />

            {/* Title */}
            <h5 className="auth-form__title text-center mb-4">
              Change Password
            </h5>

            {/* Form Fields */}
            <Form>
              <FormGroup>
                <label htmlFor="exampleInputPassword1">Password</label>
                <FormInput
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputPassword2">Repeat Password</label>
                <FormInput
                  type="password"
                  id="exampleInputPassword2"
                  placeholder="Repeat Password"
                  autoComplete="new-password"
                />
              </FormGroup>
              <Button
                pill
                theme="accent"
                className="d-table mx-auto"
                type="submit"
              >
                Change Password
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ChangePassword;
