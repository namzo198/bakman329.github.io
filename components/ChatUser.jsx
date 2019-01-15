import React from 'react'
import ReactDOM from 'react-dom'
import {getProfilePic} from '../utilities.js'

import Button from './Button.jsx'

class ChatUser extends React.Component {
    constructor(props) {
        super(props);

        this.onClickName = this.onClickName.bind(this);
    }

    onClickName() {
        var event = {action : 'Clicked Chat User', // state.action,
                     context : 'From NewsFeed', // state.context,
                     name : this.props.name};
        var added = this.props.chat.addChat(this.props.name);
        return ((added) ? event : null);
    }

    render() {
       return (
          <div id='chat-user'>
             <img id='profile-pic' src={getProfilePic(this.props.name)} />
             <Button onClick={this.onClickName}>{this.props.name}</Button>
          </div>
       );
    }
}

export default ChatUser;