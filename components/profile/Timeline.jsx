import React from 'react'
import {linkToName} from '../../utilities.js'

import PostArea from '../PostArea.jsx'

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    location.reload();
  }

  render() {
    console.log(linkToName(this.props.match.params.user))
    return (
      <PostArea name={linkToName(this.props.match.params.user)} />
    );
  }
}

export default Timeline;