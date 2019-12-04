import React from "react";
import { Link } from 'react-router-dom';
import { followUserTopic, unfollowUserTopic } from "../actions/userActions";
import {
  Badge,
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
    const { topic, username, author, isFollowing } = this.props;

    if (username === author){
      return (
        <Badge
          outline pill
          className="text-uppercase border mb-1 mr-1"
        >
          <Link to={'/t/' + topic}> {topic} </Link>
        </Badge>
      );
    }
    return (
      <Dropdown open={this.state.open} toggle={this.toggle} >
        <DropdownToggle className="text-uppercase badge badge-pill badge-outline-primary border mb-1 mr-1" >
          {topic} <i className="fas fa-caret-down"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key="go_to"><Link className="text-dark" to={'/t/' + topic}>Go to</Link></DropdownItem>
          {isFollowing ? (
            <DropdownItem key="unfollowTopic" onClick={() => unfollowUserTopic(author, topic)}>
              Unfollow {author}'s {topic}
            </DropdownItem>
          ) : (
            <DropdownItem key="followTopic" onClick={() => followUserTopic(author, topic)}>
              Follow {author}'s {topic}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}