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

class DMWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: "hello",
      invalidMessage: false,
      messages: [
        {
          sender: "youngsik",
          message: "yeetdog"
        },
        {
          sender: "jeremy",
          message: "yeatdog"
        },
        {
          sender: "Jieun",
          message: "yotedog"
        }
      ]
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.loadData(this.props.username);
  }

  sendMessage() {
    let { messageText, messages } = this.state;

    if (messageText === '') {
      this.setState({
        invalidMessage: true
      })
      return;
    }
  
    messages.push({
      sender: localStorage.getItem('uid'),
      message: messageText
    })

    this.setState({
      messages: messages,
      messageText: ''
    })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.loadData(nextProps.username);
    }
  }

  loadData(username) {
    if (!username) {
      return;
    }
    /*
        db.collection('users').doc(username).get()
          .then(function (doc) {
            if (doc.exists) {
              let user = doc.data();
              const { following } = JSON.parse(localStorage.getItem('user'));
    
              this.setState({
                username: user.username,
                photoUrl: user.photoUrl,
                bio: user.bio,
                email: user.email,
                topics: user.topics,
                displayName: user.displayName,
                isFollowing: following.indexOf(this.props.username) !== -1
              })
            }
          }.bind(this));
          */
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      invalidMessage: false,
    });
  }

  render() {
    const { messageText, invalidMessage, messages } = this.state;

    return (
      <Card small className="user-teams mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0"> Conversation </h6>
        </CardHeader>
        <CardBody className="pt-3 px-0">
          <Container fluid>
            {
              messages.map((msg) => {
                const { sender, message } = msg;
                return (
                  <span><b> {sender + ": "} </b> {message} </span>
                )
              })
            }
          </Container>
        </CardBody>

        <CardFooter>
          <div className="ml-auto mt-auto input-group pt-1">
            <FormInput placeholder="Send a message"
              onChange={this.handleChange}
              id='messageText'
              value={messageText}
              invalid={invalidMessage} />
            <div className="input-group-append">
              <Button className="px-2 btn btn-white" onClick={this.sendMessage}>
                <i className="material-icons">send</i>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

    )
  }
};


export default DMWidget;
