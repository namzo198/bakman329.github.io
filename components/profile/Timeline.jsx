import React from 'react'
import {linkToName} from '../../utilities.js'

import PostArea from '../PostArea.jsx'

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
   // location.reload();
  }

  render() {
   // console.log(linkToName(this.props.match.params.user))
    //console.log("Timeline: The suggestion is "+this.props.displayContactInfoSuggestion)
    return (
      <PostArea name={linkToName(this.props.match.params.user)} displayContactInfoSuggestion = {this.props.displayContactInfoSuggestion}/>
    );
  }
}

export default Timeline;