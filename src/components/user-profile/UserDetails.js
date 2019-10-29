import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button } from "shards-react";
import { connect } from "react-redux";
import { db } from '../../utils/firebase';
import { followUser, unfollowUser } from '../../actions/userActions';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      photoUrl: '',
      bio: '',
      email: '',
      topics: [],
      isFollowing: false
    }

    this.followingButton = this.followingButton.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentWillMount() {
    if (!this.props.username) {
      return;
    }
    console.log('hot shower')

    db.collection('users').doc(this.props.username).get()
      .then(function (doc) {
        if (doc.exists) {
          let user = doc.data();
          this.setState({
            username: user.username,
            photoUrl: user.photoUrl,
            bio: user.bio,
            email: user.email,
            topics: user.topics,
            displayName: user.displayName
          })
          const { following } = JSON.parse(localStorage.getItem('user'));
          this.setState({
            isFollowing: following.indexOf(this.props.username) !== -1
          })
          
        }
      }.bind(this));
  }


  followUser() {
    this.props.followUser(this.state.username);
    this.setState({
      isFollowing: true
    })
  }

  unfollowUser() {
    this.props.unfollowUser(this.state.username);
    this.setState({
      isFollowing: false
    })
  }

  followingButton() {
    const { username, isFollowing } = this.state;
    const { following } = JSON.parse(localStorage.getItem('user'));

    if (username === localStorage.getItem('uid')) {
      return <Link 
      to="/edit-profile"
      className="btn btn-pill btn-secondary d-table mx-auto mb-3"
    >Edit Profile</Link>
    }
    else if (!isFollowing) {
      return <Button
        pill
        theme="secondary"
        className="d-table mx-auto mb-3"
        onClick={this.followUser}
      >Follow User</Button>
    }
    else {
      return <Button
        pill
        theme="primary"
        className="d-table mx-auto mb-3"
        onClick={this.unfollowUser}
      >Following</Button>
    }
  }

  render() {
    let { userData } = this.props;
    let { username, photoUrl, bio, email, topics, displayName } = this.state;
    // let topicsArray = [];
    // for(let i = 0; i < this.state.topics.length; i++){
    //   array.push(

    //   );
    // }
    return (
      <Card small className="user-details mb-4">
        <CardHeader className="p-0">
          <div className="user-details__bg">
            <img src={userData.coverImg} alt={userData.name} />
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {/* User Avatar */}
          <div className="user-details__avatar mx-auto">
            <img src={photoUrl} alt={displayName} />
          </div>
          {/* User Name */}
          <h4 className="text-center m-0 mt-2">{displayName}</h4>
          {/* User Bio */}
          <p className="text-center text-light m-0 mb-2">{bio}</p>
          {/* User Social Icons */}
          {
            this.followingButton()
          }
          {/*
          <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
            {userData.social.facebook && (
              <li className="mx-1">
                <a href="https://www.facebook.com/obitola">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
            )}
            {userData.social.twitter && (
              <li className="mx-1">
                <a href="https://www.instagram.com/tobiola__">
                  <i className="fab fa-twitter" />
                </a>
              </li>
            )}
            {userData.social.github && (
              <li className="mx-1">
                <a href="https://github.com/tobiola">
                  <i className="fab fa-github" />
                </a>
              </li>
            )}
            {userData.social.slack && (
              <li className="mx-1">
                <a href="https://www.instagram.com/tobiola__">
                  <i className="fab fa-slack" />
                </a>
              </li>
            )}
          </ul>
          */}
          {/* User Data */}
          <div className="user-details__user-data border-top border-bottom p-4">
            <Row className="mb-3">
              <Col className="w-50">
                <span>Email</span>
                <span>{email}</span>
              </Col>
              <Col className="w-50">
                <span>Username</span>
                <span>{username}</span>
              </Col>
            </Row>
            {/* Following Topics */}
            <Row className="mb-3">
              <Col>
                <span>Following Topics:</span>
                <Row className="pl-3 pt-1">
                  {
                    this.state.topics.map((tag, idx) => (
                      <Badge
                        pill
                        theme="light"
                        className="text-light text-uppercase mb-0 border mr-1"
                        key={idx}
                      ><Link to={'/t/' + tag}>
                        {tag}
                        </Link>
                      </Badge>
                    ))
                  }
                </Row>
              </Col>
            </Row>
          </div>
          {/* User Tags */}
          {/* <div className="user-details__tags p-4">
            {topics.map((topic, idx) => (
              <Badge
                pill
                theme="light"
                className="text-light text-uppercase mb-2 border mr-1"
                key={idx}
              >
                {topic}
              </Badge>
            ))}
          </div> */}
        </CardBody>
      </Card>
    )
  }
};

UserDetails.propTypes = {
  /**
   * The user data.
   */
  userData: PropTypes.object
};

UserDetails.defaultProps = {
  userData: {
    // TODO: change url /user-profile/ into /u/:username
    coverImg: require("../../images/user-profile/up-user-details-background.jpg"),
    avatarImg: require("../../images/avatars/0.jpg"),
    name: "Sierra Brooks",
    bio: "I'm a design focused engineer.",
    email: "sierra@example.com",
    location: "Remote",
    phone: "+40 1234 567 890",
    accNumber: "123456789",
    social: {
      facebook: "#",
      twitter: "#",
      github: "#",
      slack: "#"
    },
    tags: [
      "User Experience",
      "UI Design",
      "React JS",
      "HTML & CSS",
      "JavaScript",
      "Bootstrap 4"
    ]
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { followUser, unfollowUser })(UserDetails);
