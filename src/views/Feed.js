/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from "shards-react";

const Feed = () => (
  /* Main contains Feed */
  <Card small className="h-100">
    {/* Card Header */}
    <CardHeader className="border-bottom">
      <h6 className="m-0">Hey, it's a post!</h6>
    </CardHeader>

    <CardBody className="d-flex flex-column">
      <Form className="quick-post-form">

        {/* Body */}
        <FormGroup>
          <p> Aight-- it works </p>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

export default Feed;
