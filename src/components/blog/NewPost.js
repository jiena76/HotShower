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
      tags: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleTagsChange(tags) {
    this.setState({ tags });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, tags } = this.state;
    console.log(tags)
    this.props.uploadPost(text);
    this.setState({text: '', tags: []});
  }

  render() {
    return (
      <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.props.title}</h6>
        </CardHeader>

        <CardBody className="d-flex flex-column">
          <Form className="quick-post-form" onSubmit={this.handleSubmit}>



            {/* Body */}
            <FormGroup>
            <TagsInput
                value={this.state.tags}
                onChange={this.handleTagsChange}
                placeholder="What's the topic?"
                />
            <FormTextarea
                placeholder="What's on your mind?"
                onChange={this.handleChange}
                type="text"
                id="text"
                value={this.state.text} />
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
})

export default connect(mapStateToProps, { uploadPost })(NewPost);
