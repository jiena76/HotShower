import React from "react";
import TagsInput from "react-tagsinput";
import { db, time } from "../../utils/firebase";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { uploadPost } from '../../actions/postActions';
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";


class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      topics: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTopicsChange = this.handleTopicsChange.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleTopicsChange(topics) {
    this.setState({ topics });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, topics } = this.state;
    if (text === '') {
      return;
    }
    this.props.uploadPost(text, topics);
    this.setState({ text: '' });
    this.setState({ topics: [] });
  }

  render() {
    let { text } = this.state;
    return (
      <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
          <Row>
            <Col>
              <h6 className="m-0">{this.props.title}</h6>
            </Col>
            <Col>
              <div className='text-right mr-3'>{ 'chars left: ' + (255 - text.length) }</div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className="d-flex flex-column">
          <Form className="quick-post-form" onSubmit={this.handleSubmit}>
            {/* Body */}
            <FormGroup>

              <FormTextarea
                placeholder="What's on your mind?"
                onChange={this.handleChange}
                type="text"
                maxLength='255'
                id="text"
                value={this.state.text} />
              <TagsInput
                value={this.state.topics}
                onChange={this.handleTopicsChange}
                placeholder="What's the topic?"
              />
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

export default connect(mapStateToProps, { uploadPost })(NewPost);
