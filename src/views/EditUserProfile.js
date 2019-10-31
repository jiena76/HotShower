import Avatar from 'react-avatar-edit'
import React from "react";
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom';
import TagsInput from "react-tagsinput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import { updateUser, deleteUser } from './../actions/userActions';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  FormSelect,
  FormCheckbox,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import FormSectionTitle from "../components/edit-user-profile/FormSectionTitle";
import ProfileBackgroundPhoto from "../components/edit-user-profile/ProfileBackgroundPhoto";

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    // const src =
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    this.state = {
      preview: null,
      email: user.email,
      following: [],
      followers: [],
      topics: [],
      username: user.username,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      bio: user.bio ? user.bio : 'This is my bio',
      tags: user.topics ? user.topics : [],
      redirectToProfile: false,
      redirectToHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.confirmDeleteAccount = this.confirmDeleteAccount.bind(this);

    // this.onCrop = this.onCrop.bind(this)
    // this.onClose = this.onClose.bind(this)
  }

  handleTagsChange(tags) {
    this.setState({ tags });
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, username, displayName, photoUrl, bio, tags } = this.state;

    let user = {
      email: email,
      following: [],
      followers: [],
      topics: tags,
      username: username,
      photoUrl: photoUrl,
      displayName: displayName,
      bio: bio ? bio : 'This is my bio :)'
    };

    this.props.updateUser(user);
    this.setState({
      redirectToProfile: true
    })
  }
  
  deleteAccount() {
    this.props.deleteUser();
    this.setState({
      redirectToHome: false //true
    })
  }

  confirmDeleteAccount() {
    confirmAlert({
      title: 'Delete Account',
      message: 'Are you sure that you would like to delete your account?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteAccount()
        },
        {
          label: 'No'
        }
      ]
    });
  };

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview) {
    this.setState({ preview })
  }

  render() {
    const { redirectToHome, redirectToProfile } = this.state;
    if (redirectToHome) {
      return <Redirect to='/' />
    }

    if (redirectToProfile) {
      return <Redirect to={'/u/' + localStorage.getItem('uid')} />
    }

    return (
      <div>
        {/* <Container fluid className="px-0">
          <Alert theme="success" className="mb-0">
            Ole! Your profile has been successfully updated!
          </Alert>
        </Container> */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <Col lg="8" className="mx-auto mt-4">
              <Card small className="edit-user-details mb-4">
                <ProfileBackgroundPhoto />

                <CardBody className="p-0">
                  {/* Form Section Title :: About You */}
                  <Form className="py-4" onSubmit={this.handleSubmit}>
                    <FormSectionTitle
                      title="About You"
                      description="Tell us who you are! You can modify your personal information here."
                    />

                    <Row form className="mx-4">
                      <Col lg="8">
                        <Row form>

                          {/* Username */}
                          <Col md="6" className="form-group">
                            <label htmlFor="firstName">Username</label>
                            <FormInput
                              disabled
                              id="username"
                              value={this.state.username}
                            />
                          </Col>

                          {/* Display Name */}
                          <Col md="6" className="form-group">
                            <label htmlFor="firstName">Display Name</label>
                            <FormInput onChange={this.handleChange}
                              type="text"
                              id="displayName"
                              value={this.state.displayName}
                            />
                          </Col>

                          {/* Email Address */}
                          <Col md="6" className="form-group">
                            <label htmlFor="emailAddress">Email</label>
                            <InputGroup seamless>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0BE;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <FormInput
                                disabled
                                id="emailAddress"
                                value={this.state.email}
                                onChange={() => { }}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                      </Col>

                      {/* User Profile Picture */}
                      <Col lg="4">
                        <label
                          htmlFor="userProfilePicture"
                          className="text-center w-100 mb-4"
                        >
                          Profile Picture
                        </label>
                        <div className="edit-user-details__avatar m-auto">
                          <img
                            src={this.state.photoUrl}
                            alt="User Avatar"
                          />
                          <label className="edit-user-details__avatar__change">
                            <i className="material-icons mr-1">&#xE439;</i>
                            <FormInput
                              id="userProfilePicture"
                              className="d-none"
                            />
                          </label>
                        </div>
                        <Button
                          size="sm"
                          theme="white"
                          className="d-table mx-auto mt-4"
                        >
                          <i className="material-icons">&#xE2C3;</i> Upload
                          Image
                        </Button>
                      </Col>
                    </Row>

                    <Row form className="mx-4">
                      {/* User Bio */}
                      <Col md="6" className="form-group">
                        <label htmlFor="userBio">Bio</label>
                        <FormTextarea
                          style={{ minHeight: "87px" }}
                          id="bio"
                          type='text'
                          value={this.state.bio}
                          onChange={this.handleChange}
                        />
                      </Col>

                      {/* User Tags */}
                      <Col md="6" className="form-group">
                        <label htmlFor="userTags">Topics</label>
                        <TagsInput
                          value={this.state.tags}
                          onChange={this.handleTagsChange}
                        />
                      </Col>
                    </Row>

                    <hr />

                    {/* Form Section Title :: Notifications */}
                    <FormSectionTitle
                      title="Notifications"
                      description="Setup which notifications would you like to receive."
                    />

                    <hr />

                    {/* Change Password */}
                    <Row form className="mx-4">
                      <Col className="mb-3">
                        <h6 className="form-text m-0">Change Password</h6>
                        <p className="form-text text-muted m-0">
                          Change your current password.
                        </p>
                      </Col>
                    </Row>

                    <Row form className="mx-4">
                      <Button
                        size="sm"
                        theme="danger"
                        className="ml-auto d-table"
                        onClick={this.confirmDeleteAccount}
                      >
                        Delete Account
                      </Button>
                      <Button
                        size="sm"
                        theme="accent"
                        type="submit"
                        className="ml-2 d-table mr-3"
                      >
                        Save Changes
                  </Button>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  /*
   * The user data.
   */
  updateUser: PropTypes.func.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { updateUser, deleteUser })(EditUserProfile);
