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

const DMList = () => (
  /* DM List */
  <Card small className="h-100">
    {/* Card Header */}
    <CardHeader className="border-bottom">
      <h6 className="m-0">Direct Messeging</h6>
    </CardHeader>

    <CardBody className="d-flex flex-column">
      <ul>Jeremy Chang</ul>
      <ul>Jieun Lee</ul>
      <ul>Tobi Ola</ul>
      <ul>Youngsik Yoon</ul>
    </CardBody>
  </Card>
);

export default DMList;
