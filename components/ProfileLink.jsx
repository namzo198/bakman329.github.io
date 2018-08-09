import React from 'react'
import {Link} from 'react-router-dom'
import {nameToLink} from '../utilities.js'

class ProfileLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={{
        pathname: '/profile/' + nameToLink(this.props.name),
        state: {fromNewsFeed: (this.props.fromNewsFeed) ? (this.props.fromNewsFeed) : false}}}>
        {this.props.name}
      </Link>
    );
  }
}

export default ProfileLink;