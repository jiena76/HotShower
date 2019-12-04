/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { db, time } from "../utils/firebase";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormInput,
  Button
} from "shards-react";
import moment from "moment";

class DMWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: "",
      invalidMessage: false,
      messages: [
        {
          sender: "Hello",
          message: "loading messages...",
        }
      ],
      conversationId: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.loadData = this.loadData.bind(this);
    this.refresh = this.refresh.bind(this);

    this.loadData(this.props.username);
  }

  refresh() {
    this.setState({
      messages: [
        {
          sender: "Hello",
          message: "loading messages...",
        }
      ],
    })
    this.loadData(this.props.username);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.username !== this.props.username) {
      this.loadData(nextProps.username);
    }
  }

  sendMessage() {
    let { messageText, messages, conversationId } = this.state;

    if (messageText === '' || conversationId === '') {
      this.setState({
        invalidMessage: true
      })
      return;
    }

    messages.push({
      sender: localStorage.getItem('uid'),
      message: messageText,
    })

    db.collection('messages').add({
      conversationId: conversationId,
      sender: localStorage.getItem('uid'),
      message: messageText,
      sentAt: time.now()
    })

    this.setState({
      messages: messages,
      messageText: ''
    })
  }

  async loadData(username) {
    if (!username) {
      return;
    }

    let conversationId = await db.collection('conversations')
      .where("participants", "array-contains", username).get()
      .then(function (snapshot) {
        let conversationId = '';

        snapshot.forEach((doc) => {
          if (doc.data().participants.indexOf(localStorage.getItem('uid')) !== -1) {
            conversationId = doc.id;
          }
        })



        return conversationId;
      }.bind(this));

    if (conversationId === '') {
      conversationId = await db.collection('conversations').add({
        participants: [
          username,
          localStorage.getItem('uid')
        ], 
        conversationPreview: "Tobi: yeattttt"
      })
      .then(function(docRef) {
        return docRef.id
      })
    }

    this.setState({
      conversationId: conversationId
    })

    db.collection('messages')
      .where("conversationId", "==", conversationId)
      .orderBy('sentAt', 'asc').get()
      .then(function (snapshot) {
        let messages = [];
        snapshot.forEach(function (doc) {
          if (doc.exists) {
            messages.push(doc.data());
          }
        })

        this.setState({
          messages: messages
        })
      }.bind(this))
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
          <Row>
            <Col md="9">
              <h6 className="m-0"> Conversation </h6>

            </Col>
            <Col md="3">
              <Button className="px-2 btn btn-white" onClick={this.refresh}>
                <i className="material-icons">refresh</i>
              </Button>
            </Col>
          </Row>

        </CardHeader>
        <CardBody className="pt-3 px-0">
          <Container fluid>
            {
              messages.map((msg, idx) => {
                // console.log(msg);
                const { sender, message, sentAt } = msg;
                return (
                  <p key={idx} style={{float : 'left'}}>
                    <b> {sender + ": "} </b> {message}
                    <span style={{float : 'right'}}>
                      {sentAt ? moment.unix(sentAt.seconds).format("MM/DD LT") : ""}
                    </span>
                  </p>
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

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {})(DMWidget);