import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { uploadPost } from '../../actions/postActions';
import { addTopics } from '../../actions/userActions';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormCheckbox,
  FormInput,
  FormTextarea,
} from "shards-react";

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      topicText: '',
      topics: JSON.parse(localStorage.getItem('user')).topics.map(function (topic) {
        return {
          topicName: topic,
          selected: topic === 'hotshower'
        }
      }),
      invalidText: false,
      invalidTopic: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTopicsChange = this.handleTopicsChange.bind(this);
    this.toggleTopic = this.toggleTopic.bind(this);
    this.addTopic = this.addTopic.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      invalidText: false,
      invalidTopic: false
    });
  }

  handleTopicsChange(topics) {
    this.setState({ topics });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, topics } = this.state;
    if (text === '') {
      this.setState({
        invalidText: true
      })
      return;
    }

    let postTopics = [];
    topics.forEach(function (topic) {
      const { topicName, selected } = topic;
        
      if (selected) {
        postTopics.push(topicName)
      }
    })

    if (postTopics.length === 0) {
      // display error
    }

    this.props.uploadPost(text, postTopics);
    this.props.addTopics(postTopics);
    this.setState({
      text: '',
      topicText: ''
    });

  }

  addTopic() {
    let { topicText, topics } = this.state;

    if (topicText === '') {
      this.setState({
        invalidTopic: true
      })
      return;
    }

    topics.push({
      topicName: topicText.toLowerCase().replace(/\s/g, ''),
      selected: true
    })

    this.setState({
      topicText: '',
      topics: topics
    })
  }

  toggleTopic(e, topicIndex) {
    e.preventDefault();
    const { topics } = this.state;
    topics[topicIndex].selected = !topics[topicIndex].selected;
    this.setState({
      topics: topics
    })
  }

  render() {
    const { text, invalidText, topics, invalidTopic, topicText } = this.state;

    return (
      <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
          <Row>
            <Col>
              <h6 className="m-0">{this.props.title}</h6>
            </Col>
            <Col>
              <div className='text-right mr-3'>{'chars left: ' + (255 - text.length)}</div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className="d-flex flex-column">
          <Form className="quick-post-form" onSubmit={this.handleSubmit}>
            {/* Body */}
            <FormGroup>
              <FormTextarea
                placeholder={invalidText ? "Please add text before sending" : "What's on your mind?"}
                onChange={this.handleChange}
                type="text"
                maxLength='255'
                id="text"
                value={text}
                invalid={invalidText} />
              <div className="pt-3">
                <div className="pb-1">Topics</div>
                <div>{
                  topics.map((topic, idx) => {

                    const { topicName, selected } = topic;
                    return (
                      <FormCheckbox key={idx} onChange={(e) => { this.toggleTopic(e, idx) }} checked={selected}>{topicName}</FormCheckbox>
                    )
                  })
                }</div>
                <div className="ml-auto input-group pt-1">
                  <FormInput placeholder="New Topic"
                    onChange={this.handleChange}
                    id='topicText'
                    value={topicText}
                    invalid={invalidTopic} />
                  <div className="input-group-append">
                    <Button className="px-2 btn btn-white" onClick={this.addTopic}>
                      <i className="material-icons">add</i>
                    </Button>
                  </div>
                </div>
              </div>
              {/* <TagsInput
                className="rounded border"
                value={this.state.topics}
                onChange={this.handleTopicsChange}
                placeholder="What's the topic?"
              /> */}
            </FormGroup>

            {/* Create Draft */}
            <FormGroup className="mb-0">
              <Button theme="accent" pill type="submit">
                Create Post
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
};

NewPost.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

NewPost.defaultProps = {
  title: "New Post"
};

NewPost.propTypes = {
  uploadPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, { uploadPost, addTopics })(NewPost);
