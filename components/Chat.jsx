import React from 'react'
import ReactDOM from 'react-dom'

import Button from './Button.jsx'
import Menu from './Menu.jsx'
import ChatUser from './ChatUser.jsx'
import ChatWindow from './ChatWindow.jsx'
import Popup from './Popup.jsx'
import {containsIgnoreCase} from '../utilities.js'

class Chat extends React.Component {
   constructor(props) {
      super(props);
      this.state = {chats: [], renderChatPopup: false,
         turnOffChat: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0],
         except_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1].join(", "),
         some_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2].join(", "),
         showExceptWarning: false};
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
      this.menu.toggleShow();
   }

   handleTurnOffChatOptionChange(e) {
      this.setState({turnOffChat: e.target.value});
   }

   createTurnOffChatPopup() {
      this.setState({renderChatPopup: true});
   }

   parseText(str) {
      var raw_list = str.split(",").map(function(item) {
         return item.trim();
      });

      var friends = JSON.parse(localStorage.getItem('friends'));
      return raw_list.filter((item) => {
         return containsIgnoreCase(friends, item);
      });
   }

   updateSettings() {
      this.setState({turnOffChat: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0],
          except_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1].join(", "),
          some_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2].join(", ")});
   }

   render() {
      var chats = []
      this.state.chats.forEach((name, index, array) => {
         chats.push(<ChatWindow key={index} name={name} destroy={this.removeChat} />);
      });

      var friends = [];
      JSON.parse(localStorage.getItem('friends')).forEach((name, index, array) => {
         // Show only exceptions if allContactsExcept is on, or exclude some people if someContacts is on
         // TODO: Ignore case
         var setting = JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0];
         var except_contacts_includes = containsIgnoreCase(JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1], name);
         var some_contacts_includes = containsIgnoreCase(JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2], name);

         if (setting == "allContacts"
            || (setting == "allContactsExcept" && !except_contacts_includes)
            || (setting == "someContacts" && some_contacts_includes)) {
            return;
         }

         friends.push(<ChatUser key={index} chat={this} img='./assets/profile_img.jpg' name={name} />);
      });

      var except_text;
      var some_text;
      if (this.state.turnOffChat === "allContactsExcept") {
         except_text = <input id='turn-off-chat-all-contacts-except-text' className='popup-text-input' type='text' placeholder='Required: Enter names or lists'
               rows='1' cols='65' onKeyPress={this.onKeyPress}
               onChange={(e) => this.setState({except_contacts: e.target.value})} value={this.state.except_contacts}
               autoComplete='off' />;
      }
      else if (this.state.turnOffChat === "someContacts") {
         some_text = <input id='turn-off-chat-some-contacts-text' className='popup-text-input' type='text' placeholder='Optional: Enter names or lists'
               rows='1' cols='65' onKeyPress={this.onKeyPress}
               onChange={(e) => this.setState({some_contacts: e.target.value})} value={this.state.some_contacts}
               autoComplete='off' />;
      }

      var except_warning;
      if (this.state.showExceptWarning) {
         except_warning = (
            <p>
            Note: If "Turn off chat for all contacts except..." is selected but no contacts are entered into the box, you will be offline to all contacts.
            Please either enter a list of contacts you'd like to be online to or choose another option.
            </p>
         );
      }

   {/* TODO: Reconsile with new "Active Status" lexical change on Facebook */}
      var turnOffChatPopup = (
         <Popup title="Turn Off Chat"
            destroy={() => {
               if (this.state.turnOffChat == "allContactsExcept" && this.state.except_contacts == "") {
                  return;
               }

               this.setState({renderChatPopup: false})
            }}
            okay={() => {
               if (this.state.turnOffChat == "allContactsExcept" && this.state.except_contacts == "") {
                  this.setState({showExceptWarning: true});
                  return;
               }
               else {
                  this.setState({showExceptWarning: false});
               }

               var settings = JSON.parse(localStorage.getItem('settings'));
               settings["turn_off_chat"][0] = this.state.turnOffChat;
               settings["turn_off_chat"][1] = this.parseText(this.state.except_contacts);
               settings["turn_off_chat"][2] = this.parseText(this.state.some_contacts);
               localStorage.setItem('settings', JSON.stringify(settings));
               this.updateSettings();
            }}
            cancel={() => {this.updateSettings()}}>
            {/* https://www.w3schools.com/howto/howto_js_autocomplete.asp */}
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
            {except_text}

            <label>
               <input type="radio" id="turn-off-chat-some-contacts"
                  name="turn-off-chat" value="someContacts"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "someContacts"} />
               Turn off chat for some contacts...
            </label>
            {some_text}

            <p>Note: When chat is off, messages from contacts go to your inbox for you to read later.</p>

            {except_warning}
         </Popup>);

      // TODO: Consider if there's a better solution than this warning
      var turned_off_warning;
      if (JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0] == "allContacts") {
         turned_off_warning = <p>Note: Chat is turned off for all contacts</p>;
      }
      return (
         <div id='chat-container'>
            <div id='chat-window-container'>
               {chats}
            </div>
            <div id='chat'>
               {this.state.renderChatPopup ? turnOffChatPopup : null}
               {turned_off_warning}
               {friends}
               <div id='chat-footer'>
                  <div id='settings'>
                     <Menu ref={(_menu) => {this.menu = _menu}} upwards icon='gear'>
                        <Button onClick={this.createTurnOffChatPopup}>Turn off chat</Button>
                     </Menu>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Chat;