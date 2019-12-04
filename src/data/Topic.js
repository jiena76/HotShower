import React from "react";
import { Link } from 'react-router-dom';
import { followUserTopic } from "../actions/userActions";
import {
  Badge,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";

export default class Topic extends React.Component {
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
    // username: logged-in user
    // author: person the topic belongs to
    const { idx, topic, username, author } = this.props;
    if (username === author){
      return (
        <Badge
          outline pill
          className="text-uppercase border mb-1 mr-1"
          key={idx}
        >
          <Link to={'/t/' + topic}> {topic} </Link>
        </Badge>
      );
    }
    return (
      <Dropdown open={this.state.open} toggle={this.toggle} key={idx}>
        <DropdownToggle className="text-uppercase badge badge-pill badge-outline-primary border mb-1 mr-1" >
          {topic} <i className="fas fa-caret-down"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key="go_to"><Link className="text-dark" to={'/t/' + topic}>Go to</Link></DropdownItem>
          <DropdownItem key="followTopic" onClick={() => followUserTopic(author, topic)}>
            {/* what if the user is already following the topic from this user */}
            {/* <Button outline theme="secondary" onClick={followUserTopic(author, topic)} className="border-0">  */}
            Follow {author}'s {topic}
            {/* </Button> */}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}