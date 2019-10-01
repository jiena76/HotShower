/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
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


class Posts extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        {this.props.posts.map((post) => (
          /* Main contains Feed */
          <Card small className="h-100">
            {/* Card Header */}
            <CardHeader className="border-bottom">
              <h6 className="m-0">{post.author}</h6>
            </CardHeader>

            <CardBody className="d-flex flex-column">
              <Form className="quick-post-form">

                {/* Body */}
                <FormGroup>
                  <p> {post.text} </p>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        ))
        }
      </div>
    )
  }
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps, { fetchPosts })(Posts);