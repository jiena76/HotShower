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
} from "shards-react";

class DMList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: JSON.parse(localStorage.getItem('user')).following,
      inbox: [
        {
          image: "https://media.licdn.com/dms/image/C5103AQHaon1-WBM-bQ/profile-displayphoto-shrink_100_100/0?e=1575504000&v=beta&t=P6kvQrDxobS1rHLQ7i9fHnLEsNjXVbZR-qjOiBa9SIE",
          username: "misterPander",
          messagePreview: "yeetdog"
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
          <h6 className="m-0"> Direct Messaging </h6>
          <div className="block-handle" />
        </CardHeader>
        <CardBody className="p-0">
          <Container fluid>
            {this.state.following.map((user, index) => (
              <Link key={index} to={'/u/' + user}>
                <Row className="px-3" key={index}>
                  <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
                    <img className="rounded" src={"https://media.licdn.com/dms/image/C5103AQHaon1-WBM-bQ/profile-displayphoto-shrink_100_100/0?e=1575504000&v=beta&t=P6kvQrDxobS1rHLQ7i9fHnLEsNjXVbZR-qjOiBa9SIE"} alt={user} />
                  </Col>
                  <Col className="user-teams__info pl-3">
                    <h6 className="m-0">{user}</h6>
                    <span className="text-light">{"Click to message " + user}</span>
                  </Col>
                </Row>
              </Link>
            ))}
          </Container>
        </CardBody>
      </Card>

    )
  }
};


export default DMList;
