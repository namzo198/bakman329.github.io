import React from 'react'
import {linkToName} from '../../utilities.js'

import PostArea from '../PostArea.jsx'

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
      
     // console.log("Old "+this.props.match.params.user)
      //console.log("New "+newProps.match.params.user)
  
      if(this.props.match.params.user != newProps.match.params.user) {
          location.reload();
      }
  }
 
render() {
       // console.log("I am here for the fun");
   // console.log(linkToName(this.props.match.params.user))
    //console.log("Timeline: The suggestion is "+this.props.displayContactInfoSuggestion)
    return (
      <PostArea name = {linkToName(this.props.match.params.user)} displayContactInfoSuggestion = {this.props.displayContactInfoSuggestion} displayBasicInfoSuggestion = {this.props.displayBasicInfoSuggestion} displayUnsubscribeSuggestion = {this.props.displayUnsubscribeSuggestion} updateSubscribe={this.props.updateSubscribe} displayCategorizeSuggestion = {this.props.displayCategorizeSuggestion}  forTimeline = {true}/>
    );
  }
}

export default Timeline;