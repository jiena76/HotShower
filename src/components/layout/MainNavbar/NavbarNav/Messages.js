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
                <img className="rounded user-teams__image my-auto p-0 col-sm-1 col-lg-12" src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/43442090_962560990597997_5893979570146639872_o.jpg?_nc_cat=109&_nc_oc=AQnOGv0jpJhmVVWdoyXdYMGeaenrC4LmB98ySLw_yjJV5Nl1zXJKSu7L6ln0AefpSIo&_nc_ht=scontent-ort2-1.xx&oh=73863e677129e369fb6522993c12af93&oe=5E3C7C7E"></img>
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
