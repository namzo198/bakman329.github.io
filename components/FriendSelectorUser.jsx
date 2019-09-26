import React from 'react'
import ReactDOM from 'react-dom'
import {getProfilePic} from '../utilities.js'

import Button from './Button.jsx'

class FriendSelectorUser extends React.Component {
    constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
      document.addEventListener('click', this.onClick);
    }

    onClick(e) {
      if (this.container.contains(e.target)) {
        //console.log("Clicked on " + this.props.name);
        this.props.onClick(this.props.name);
      }
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.onClick);
    }

    render() {
       return (
          <div id='friend-selector-user' ref={(element) => {this.container = element}}>
             <img id='friend-selector-profile-pic' src={getProfilePic(this.props.name)} />
             <span id='friend-selector-name'>{this.props.name}</span>
             <span id='friend-selector-setting' className={(this.props.enabled ? 'friend-selector-enabled' : '') + ' ' + (this.props.except ? 'friend-selector-except' : '')}></span>
          </div>
       );
    }
}

export default FriendSelectorUser;