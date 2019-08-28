import React from 'react'
import ReactDOM from 'react-dom'
import {getProfilePic} from '../utilities.js'
import classNames from 'classnames'

import Button from './Button.jsx'

class ChatUser extends React.Component {
    constructor(props) {
        super(props);

        this.onClickName = this.onClickName.bind(this);
    }

    onClickName() {
        var event = {action : 'Clicked on Chat User  '+this.props.name, // state.action,
                     context : 'To Open ChatWindow', // state.context,
                    };
        var added = this.props.chat.addChat(this.props.name);
        return ((added) ? event : null);
    }

    render() {
        
    var chatUser = classNames({
      'chat-user': !this.props.allContacts,
      'off-active-status': this.props.allContacts,
    });

       return (
          <div id={chatUser}>
             <img id='profile-pic' src={getProfilePic(this.props.name)} />
             <Button onClick={this.onClickName}>{this.props.name}</Button>
          </div>
       );
    }
}

export default ChatUser;