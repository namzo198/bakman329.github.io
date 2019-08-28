import React from 'react'
import {resetChat,registerEvent} from '../utilities.js'
import Button from './Button.jsx'
import ProfileLink from './ProfileLink.jsx';

class ChatWindow extends React.Component {
   constructor(props) {
       super(props);
       this.state = {value: '', name: ''};

       this.onKeyPress = this.onKeyPress.bind(this);
       this.destroyWindow = this.destroyWindow.bind(this);
       this.registerClick = this.registerClick.bind(this);
   }

   onKeyPress(e) {
       if (e.key === 'Enter') {
           if(this.state.value === '') {
              return;
           }

           var outgoing_messages_list = JSON.parse(localStorage.outgoing_messages);
           var outgoing_messages_user = [];
           if (outgoing_messages_list) {
               outgoing_messages_user = outgoing_messages_list[this.props.name];
               if (!outgoing_messages_user) {
                   outgoing_messages_user = [];
               }
               outgoing_messages_user.push(this.state.value);

               outgoing_messages_list[this.props.name] = outgoing_messages_user;
               localStorage.outgoing_messages = JSON.stringify(outgoing_messages_list);
           }

           registerEvent('Entered this chat message "'+ this.state.value +'"',' for '+ this.props.name, "In Chat Window");
       }
   }
   registerClick() {
    registerEvent('Clicked on '+this.props.name+", '\s profile link to visit their profile page", " From Chat Window");   
   }
    
   destroyWindow() {
       var event = {action : 'Closed Chat Window for '+this.props.name,
                    context : 'From NewsFeed', // state.context,
                   };
       this.props.destroy(this.props.name);
       return event;
   }

   render() {
      if (!localStorage.incoming_messages || !localStorage.outgoing_messages) {
         resetChat();
      }

      var incoming_messages_list = JSON.parse(localStorage.incoming_messages)[this.props.name];
      var incoming_messages = [];
      if (incoming_messages_list) {
         for (var i = 0; i < incoming_messages_list.length; i++) {
            incoming_messages.push(<p id='chat-left' key={i}>{incoming_messages_list[i]}</p>);
         }
      }

      var outgoing_messages_list = JSON.parse(localStorage.outgoing_messages)[this.props.name];
      var outgoing_messages = [];
      if (outgoing_messages_list) {
         for (var i = 0; i < outgoing_messages_list.length; i++) {
            outgoing_messages.push(<p id='chat-right' key={i}>{outgoing_messages_list[i]}</p>);
         }
      }

      return (
         <div id='chat-window'>
            <div id='chat-header'>
               {/* TODO: Add option to turn chat back on from here */}
               <ProfileLink name={this.props.name}  onClick={this.registerClick}/>
               <Button id='chat-close' onClick={this.destroyWindow}>&#10005;</Button>
            </div>
            <div id='chat-content'>
               {incoming_messages}
               {outgoing_messages}
            </div>
            <input id='new-message' type='text' placeholder='Type a message'
               rows='1' cols='65' onKeyPress={this.onKeyPress}
               onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}
               autoComplete='off' />
         </div>
      );
   }
}

export default ChatWindow;