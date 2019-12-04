import React from "react";
import { Link } from 'react-router-dom';
import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

export default class DropdownExample extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  render() {
    const { topic, index, username } = this.props;
    return (
      <Dropdown open={this.state.open} toggle={this.toggle} key={index}>
        <DropdownToggle className="text-uppercase badge badge-pill badge-outline-primary border mb-1 mr-1" >
          {topic} <i className="fas fa-caret-down"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem ><Link className="text-dark" to={'/t/' + topic}>Go to</Link></DropdownItem>
          <DropdownItem >Follow {username}'s {topic}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}