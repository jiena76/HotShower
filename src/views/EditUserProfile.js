import Avatar from 'react-avatar-edit'
import React from "react";
import ReactDOM from 'react-dom'
import TagsInput from "react-tagsinput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from './../actions/userActions';

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

    let user = this.props.user;

    this.state = {
      preview: null,
      email: user.email,
      following: [],
      followers: [],
      topics: [],
      username: user.username,
      photoUrl: user.photoUrl,
      bio: user.bio,
      tags: [
        "cs307",
        "computer science",
        "airpods",
        "girls",
        "how to get girls",
        "hot girls",
        "hot guys"
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

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

  handleFormSubmit(e) {
    //e.preventDefault();
    const { email, password, username, photoUrl } = this.state;

    let user = {
      email: email,
      following: [],
      followers: [],
      topics: [],
      username: username,
      photoUrl: photoUrl
    };

    this.props.updateUser(user);
  }

  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
  }

  render() {
    let { userData } = this.props;
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
                  <Form className="py-4" onSubmit={this.handleFormSubmit}>
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
                            value={this.state.username}
                          />
                        </Col>

                          {/* Location */}
                          <Col md="6" className="form-group">
                            <label htmlFor="userLocation">Location</label>
                            <InputGroup seamless>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0C8;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <FormInput
                                id="userLocation"
                                value=""
                                onChange={() => {}}
                              />
                            </InputGroup>
                          </Col>

                          {/* Phone Number */}
                          <Col md="6" className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <InputGroup seamless>
                              <InputGroupAddon type="prepend">
                                <InputGroupText>
                                  <i className="material-icons">&#xE0CD;</i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <FormInput
                                id="phoneNumber"
                                value="+40 1234 567 890"
                                onChange={() => {}}
                              />
                            </InputGroup>
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
                                id="emailAddress"
                                value={this.state.email}
                                onChange={() => {}}
                              />
                            </InputGroup>
                          </Col>

                          <Col md="6" className="form-group">
                            <label htmlFor="displayEmail">
                              Display Email Publicly
                            </label>
                            <FormSelect>
                              <option>Select an Option</option>
                              <option>Yes, display my email.</option>
                              <option>No, do not display my email.</option>
                            </FormSelect>
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
                          id="userBio"
                          value={this.state.bio}
                          onChange={() => {}}
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

                    {/* Form Section Title :: Social Profiles */}
                    <FormSectionTitle
                      title="Social"
                      description="Setup your social profiles info."
                    />

                    <Row form className="mx-4">
                      {/* Facebook */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialFacebook">Facebook</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-facebook-f" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="socialFacebook" onChange={() => {}} />
                        </InputGroup>
                      </Col>

                      {/* Twitter */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialTwitter">Twitter</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-twitter" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="socialTwitter" onChange={() => {}} />
                        </InputGroup>
                      </Col>

                      {/* GitHub */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialGitHub">GitHub</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-github" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="socialGitHub" onChange={() => {}} />
                        </InputGroup>
                      </Col>

                      {/* Slack */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialSlack">Slack</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-slack" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="socialSlack" onChange={() => {}} />
                        </InputGroup>
                      </Col>

                      {/* Dribbble */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialDribbble">Dribbble</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-dribbble" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput id="socialDribbble" onChange={() => {}} />
                        </InputGroup>
                      </Col>

                      {/* Google Plus */}
                      <Col md="4" className="form-group">
                        <label htmlFor="socialGooglePlus">Google Plus</label>
                        <InputGroup seamless>
                          <InputGroupAddon type="prepend">
                            <InputGroupText>
                              <i className="fab fa-google-plus-g" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormInput
                            id="socialGooglePlus"
                            onChange={() => {}}
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <hr />

                    {/* Form Section Title :: Notifications */}
                    <FormSectionTitle
                      title="Notifications"
                      description="Setup which notifications would you like to receive."
                    />

                    {/* Notifications :: Conversations */}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="conversationsEmailsToggle"
                        className="col-form-label"
                      >
                        Messages
                        <small className="text-muted form-text">
                          Sends notification emails with updates for the
                          messages you are participating in.
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                          toggle
                          checked
                          className="ml-auto my-auto"
                          id="conversationsEmailsToggle"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>

                    {/* Notifications :: New Projects */}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="newProjectsEmailsToggle"
                        className="col-form-label"
                      >
                        Comments
                        <small className="text-muted form-text">
                          Sends notification emails when someone comments on your post.
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                          toggle
                          className="ml-auto my-auto"
                          id="newProjectsEmailsToggle"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>

                    {/* Notifications :: Vulnerabilities */}
                    <Row form className="mx-4">
                      <Col
                        tag="label"
                        htmlFor="conversationsEmailsToggle"
                        className="col-form-label"
                      >
                        Vulnerability Alerts
                        <small className="text-muted form-text">
                          Sends notification emails when everything goes down
                          and there's no hope left whatsoever.
                        </small>
                      </Col>
                      <Col className="d-flex">
                        <FormCheckbox
                          toggle
                          checked
                          className="ml-auto my-auto"
                          id="conversationsEmailsToggle"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>

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
                      {/* Change Password :: Old Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <FormInput
                          id="oldPassword"
                          placeholder="Old Password"
                          onChange={() => {}}
                        />
                      </Col>

                      {/* Change Password :: New Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <FormInput
                          id="newPassword"
                          placeholder="New Password"
                          onChange={() => {}}
                        />
                      </Col>

                      {/* Change Password :: Repeat New Password */}
                      <Col md="4" className="form-group">
                        <label htmlFor="repeatNewPassword">
                          Repeat New Password
                        </label>
                        <FormInput
                          id="repeatNewPassword"
                          placeholder="Old Password"
                          onChange={() => {}}
                        />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="border-top">
                  <Button
                    size="sm"
                    theme="accent"
                    className="ml-auto d-table mr-3"
                  >
                    Save Changes
                  </Button>
                </CardFooter>
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

export default connect(mapStateToProps, {updateUser})(EditUserProfile);
