import React from 'react';
import ReactDOM from 'react-dom';

import Button from './Button.jsx'
import Menu from './Menu.jsx'
import MenuButton from './MenuButton.jsx'
import ChatUser from './ChatUser.jsx'
import ChatWindow from './ChatWindow.jsx'
import Popup from './Popup.jsx'

class Chat extends React.Component {
   constructor(props) {
      super(props);
      this.state = {chats: [], renderChatPopup: false, turnOffChat: "someContacts"};
      this.turnOffChatPopup = null;

      this.addChat = this.addChat.bind(this);
      this.removeChat = this.removeChat.bind(this);
      this.toggleMenu = this.toggleMenu.bind(this);
      this.handleTurnOffChatOptionChange = this.handleTurnOffChatOptionChange.bind(this);
      this.createTurnOffChatPopup = this.createTurnOffChatPopup.bind(this);
   }

   addChat(name) {
        if (this.state.chats.includes(name)) {
            return false;
        }

        this.setState({'chats': [name].concat(this.state.chats)});
        this.forceUpdate();

       return true;
   }

   removeChat(name) {
      var chats = this.state.chats;
      var index = chats.indexOf(name);
      if (index > -1) {
         chats.splice(index, 1);
      }

      this.setState({'chats': chats});
   }

   toggleMenu() {
      this._menu.toggleShow();
   }

   handleTurnOffChatOptionChange(e) {
      this.setState({turnOffChat: e.target.value});
   }

   createTurnOffChatPopup() {
      this.setState({renderChatPopup: true});
   }

   render() {
      var chats = []
      this.state.chats.forEach((name, index, array) => {
          chats.push(<ChatWindow key={index} name={name} destroy={this.removeChat} />);
      });

      var turnOffChatPopup = (
         <Popup title="Turn Off Chat" destroy={() => {this.setState({renderChatPopup: false})}}>
            <label>
               <input type="radio" id="turn-off-chat-all-contacts"
                  name="turn-off-chat" value="allContacts"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "allContacts"} />
               Turn off chat for all contacts
            </label>

            <label>
               <input type="radio" id="turn-off-chat-all-contacts-except"
                  name="turn-off-chat" value="allContactsExcept"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "allContactsExcept"} />
               Turn off chat for all contacts except...
            </label>

            <label>
               <input type="radio" id="turn-off-chat-some-contacts"
                  name="turn-off-chat" value="someContacts"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "someContacts"} />
               Turn off chat for some contacts...
            </label>
            <p>Note: When chat is off, messages from contacts go to your inbox for you to read later.</p>
         </Popup>)

      return (
         <div id='chat-container'>
            <div id='chat-window-container'>
               {chats}
            </div>
            <div id='chat'>
               {this.state.renderChatPopup ? turnOffChatPopup : null}
               <ChatUser chat={this} img='./assets/profile_img.jpg' name='Jack Roe' />
               <ChatUser chat={this} img='./assets/profile_img.jpg' name='Jim Mend' />
               <div id='chat-footer'>
                  <div id='settings'>
                     <Menu ref={(menu) => {this._menu = menu; }}>
                        <MenuButton href='javascript:void(0)' onClick={this.createTurnOffChatPopup}>Turn off chat</MenuButton>
                     </Menu>
                     {/* TODO: Figure out how we're doing icons, and replace this */}
                     <Button href='javascript:void(0)' onClick={this.toggleMenu}>*</Button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Chat;