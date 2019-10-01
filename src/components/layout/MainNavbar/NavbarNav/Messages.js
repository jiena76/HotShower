import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleMessages = this.toggleMessages.bind(this);
  }

  toggleMessages() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleMessages}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">message</i>
            <Badge pill theme="danger">
              3
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">account_circle</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Youngsik Yoon</span>
              <p>
                yeet dog
              </p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">account_circle</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Tobi Ola</span>
              <p>
                are you a wrench? because you tighten my nu...
              </p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">account_circle</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Danning Xie</span>
              <p>
                You guys are going to fail this class lol.
              </p>
            </div>
          </DropdownItem>
          <DropdownItem className="notification__all text-center">
            View all Messages
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
