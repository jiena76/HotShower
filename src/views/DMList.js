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

class DMList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [
        // TODO: change url /user-profile/ into /u/:username
        {
          image: require("../images/user-profile/team-thumb-1.png"),
          username: "misterPander",
          messagePreview: "I Love Danning Xie!!!"
        },
        {
          image: require("../images/user-profile/team-thumb-2.png"),
          username: "tobiola",
          messagePreview: "Wyd?"
        },
        {
          image: require("../images/user-profile/team-thumb-3.png"),
          username: "YoonYin",
          messagePreview: "Sara Yin is my Bae!"
        }
      ]
    }
  }

  render() {
    return (
      <Card small className="user-teams mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0"> Direct Messeging </h6>
          <div className="block-handle" />
        </CardHeader>
        <CardBody className="p-0">
          <Container fluid>
            {this.state.inbox.map((user, index) => (
              <Row className="px-3" key={index}>
                <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
                  <img className="rounded" src={user.image} alt={user.username} />
                </Col>
                <Col className="user-teams__info pl-3">
                  <h6 className="m-0">{user.username}</h6>
                  <span className="text-light">{user.messagePreview}</span>
                </Col>
              </Row>
            ))}
          </Container>
        </CardBody>
      </Card>

    )
  }
};


export default DMList;