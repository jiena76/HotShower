import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { logoutUser } from '../../../../actions/userActions';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      logout: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.setState({ logout: true });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    if (this.props.logout) {
      this.props.logoutUser();
      return <Redirect to='/'/>
    }

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={this.props.user.photoUrl}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{this.props.user.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to={'/u/' + this.props.user.username}>
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag="button" onClick={this.props.logoutUser} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { logoutUser })(UserActions)