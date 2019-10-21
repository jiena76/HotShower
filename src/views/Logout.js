import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';

class Logout extends React.Component {
  render() {
    this.props.logoutUser();
    return (
      <Redirect to="/login" />
    )
  }
}

export default connect(null, { logoutUser })(Logout);