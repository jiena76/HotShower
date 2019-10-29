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
  Button,
  Badge,
} from "shards-react";


class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      topics: [],
      existingTopics: [],
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

  componentDidMount(){
    db.collection('collection').doc('topics').get().then((doc) => 
      this.setState({ existingTopics: doc.data().topics })
    );
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
                value={this.state.text}
              />
              <div className="pt-3">
                <div className="pb-1">Topics</div>
                <div>{
                  this.state.existingTopics.map((topic, idx) => (
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id={`checkbox ${idx}`} />
                      <label className="custom-control-label" for={`checkbox ${idx}`}>{topic}</label>
                    </div>
                  ))
                  }</div>
                  <div className="ml-auto input-group pt-1">
                    <input placeholder="New Topic" className="form-control" />
                    <div className="input-group-append">
                      <button className="px-2 btn btn-white">
                        <i className="material-icons">add</i>
                      </button>
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

export default connect(mapStateToProps, { uploadPost })(NewPost);
