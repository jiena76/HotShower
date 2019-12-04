/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  fetchPostsByTopics, 
  fetchPostsByTopic, 
  likePost, 
  deletePost, 
  fetchPostsByUser, 
  fetchPostsByUserTopics 
} from '../actions/postActions';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
} from "shards-react";
import moment from "moment";
import Topic from "../data/Topic";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic
    }

    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPosts();
  }

  componentWillUpdate(nextProps) {
    const { topic, user } = this.props;
    if ((topic === nextProps.topic) && (user === nextProps.user)) {
      return;
    }

    this.props = nextProps;
    this.fetchPosts();
  }

  fetchPosts() {
    const { topic, user, fetchPostsByTopic, fetchPostsByTopics, fetchPostsByUser, fetchPostsByUserTopics } = this.props;

    if (topic) {
      fetchPostsByTopic(topic)
    }
    else if (user) {
      fetchPostsByUser(user)
    }
    else {
      fetchPostsByTopics();
    }
  }

  render() {
    const { posts } = this.props;
    const username = JSON.parse(localStorage.getItem('user')).username;
    return (
      <div>
        {posts.map((post) => {
          const { author, authorPic, text, likes, createdAt } = post;
          // console.log(post);
          const liked = likes.indexOf(localStorage.getItem('uid')) !== -1;
          return (
            /* Main contains Feed */
            <Card small className="h-100 mb-3" key={post.docID}>
              {/* Card Header */}
              <CardHeader className="border-bottom d-flex flex-column">
                <Row className="px-3">

                  <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
                    <img className="rounded" src={authorPic} alt={author} />
                  </Col>
                  <Col className="user-teams__info pl-3">
                    <h5 className="m-0"><Link to={'/u/' + author}> {'@' + author}</Link></h5>
                    <h6 className="text-bold">{text}</h6>
                  </Col>
                  <Col>
                    <span style={{color: 'silver'}}>
                      {createdAt ? moment.unix(createdAt.seconds).format("MM/DD LT") : ""}
                    </span>
                    <Button onClick={() => deletePost(post)}
                            className="px-2 py-1 float-right btn btn-outline-secondary border-0 btn-small">
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>

              </CardHeader>
              <CardBody className="d-flex flex-column">
                <Row>
                  <Col sm='6' md='7' lg='8'>
                <Form className="quick-post-form">

                  {/* Body */}
                  <FormGroup className="m-0">
                    { post.topics.map((tag, idx) => (
                        <Topic key={idx} topic={tag} username={username} author={author} />
                    )) }
                  </FormGroup>
                </Form>
                
                </Col>
                <Col sm='6' md="5" lg='4'>
                  <Button onClick={() => likePost(post)} theme='light' pill className="ml-auto">
                    {likes.length} <span>{liked ? '❤️' : '♡' }</span>
                  </Button>
                </Col>
                </Row>
              </CardBody>
            </Card>
          )
        })}
      </div>
    )
  }
};

Posts.propTypes = {
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps, { fetchPostsByTopics, fetchPostsByTopic, likePost, deletePost, fetchPostsByUser, fetchPostsByUserTopics })(Posts);
