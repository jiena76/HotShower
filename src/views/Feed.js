/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { db } from "../utils/firebase";
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


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.getRecentPosts = this.getRecentPosts.bind(this);
    this.getRecentPosts();
  }

  getRecentPosts() {
    db.collection('posts').orderBy('createdAt').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];

      snapshot.forEach(doc => {
        posts.push(doc.data());
      })

      this.setState({ posts: posts });
    }.bind(this))
  }

  render() {
    return (
      this.state.posts.map((post) => (
      /* Main contains Feed */
      <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
          <h6 className="m-0">{ post.author }</h6>
        </CardHeader>

        <CardBody className="d-flex flex-column">
          <Form className="quick-post-form">

            {/* Body */}
            <FormGroup>
              <p> { post.text } </p>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      ))
    )
  }
};

export default Feed;
