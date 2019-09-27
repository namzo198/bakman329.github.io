import React from 'react'
import {Link} from 'react-router-dom'
import {nameToLink,registerEvent} from '../utilities.js'

class ProfileLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      
      //registerEvent('Clicked on ProfileLink for '+this.props.name, "Add something",this.props.fromNewsFeed);
    return (
      <Link to={{
        pathname: `/profile/${nameToLink(this.props.name)}`,
        state: {fromNewsFeed: (this.props.fromNewsFeed) ? (this.props.fromNewsFeed) : false}}} onClick={this.props.onClick !== undefined? this.props.onClick:null}>
           <span id="left-navagation-profile_name">{this.props.name}</span>
      </Link>
    );
  }
}

export default ProfileLink;
