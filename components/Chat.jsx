import React from 'react'
import ReactDOM from 'react-dom'

import AutocompleteInput from './AutocompleteInput.jsx'
import Button from './Button.jsx'
import Menu from './Menu.jsx'
import ChatUser from './ChatUser.jsx'
import ChatWindow from './ChatWindow.jsx'
import Popup from './Popup.jsx'
import {highLight,No_highLight} from '../adaptations/Highlight.js'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import {containsIgnoreCase, getParsed,registerEvent} from '../utilities.js'
import {HighlightBoilerplate} from '../adaptations/Highlight/HighlightBoilerplate.jsx';
import AutomationBoilerplate from '../adaptations/Automation/AutomationBoilerplate.jsx';
import SuggestionBoilerplate from '../adaptations/Suggestion/SuggestionBoilerplate.jsx';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        
        let adaptations = getParsed('adaptations');
        let adaptationVisited = getParsed('visited');
   
        this.state = {
             
         chats: [], 
         renderChatPopup: false,
          turnOffChat: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0],
          except_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1].join(", "),
          some_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2].join(", "),
          showExceptWarning: false,
          renderSuggestion:false,
          reduceOpacity:false,    
        
        //Chat Highlight Adaptation
        chatHighlight:!adaptationVisited["Chat_Offline"]["highlight"] && (adaptations["chat_Offline"] == "high")? true:false, 
         context:"Chat_Offline",
        
        //Chat Auto Adaptation
            //Hide Automation Adaptation
        chatAutomation:!adaptationVisited ["Chat_Offline"]["automation"]&& (adaptations["chat_Offline"] === "auto"),    
        displayChatAutomationPopup:true,
        displayStatusLabel:false,    
        label_Auto: "Your Active Status on Chat was automatically turned off. Your friends and contacts will no longer see when you’re online on FriendBook.",  
        action:"Adapatation was for Chat_Offline, Check to see if the suggested audience for Turning off active status for all the contacts."  ,  
            
        //Chat Suggest Adaptation
        chatSuggestion: !adaptationVisited ["Chat_Offline"]["suggestion"]&& (adaptations["chat_Offline"] === "sugst"),
        label_Sugst:"Hi Alex - You have been ignoring chat messages lately. Do you want to turn off Active Status on Chat? Your friends and contacts will no longer see when you're online on FriendBook.",
            
        };
       
        this.turnOffChatPopup = null;
        

        this.addChat = this.addChat.bind(this);
        this.removeChat = this.removeChat.bind(this);
        this.cancelAllContacts = this.cancelAllContacts.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleTurnOffChatOptionChange = this.handleTurnOffChatOptionChange.bind(this);
        this.createTurnOffChatPopup = this.createTurnOffChatPopup.bind(this);
        this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
        this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
        this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
        this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
        this.show =this.show.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentWillMount(){
        //Set a time on when to display the Suggestion. 
          setTimeout(()=>this.show(),5000)
        
    }
   

    //Show the Suggestion Adaptation Methods
    show(){
         this.setState({
             renderSuggestion:true
         })
     }
    
    //Suggestion Adaptation
     onClickOK_Suggestion() {
        this.setState({
            renderSuggestion:false,
            displayStatusLabel:true,
            turnOffChat: "allContacts"
        })
       
     }
    
    onClickDestroySuggestion() {
         this.setState({renderSuggestion:false})
    }

    addChat(name) {
        if (this.state.chats.includes(name)) {
            return false;
        }

        this.setState({'chats': [name].concat(this.state.chats)});
        this.forceUpdate();

        return true;
    }

    /*Automation Adaptation */
    onClickUndo_Auto(){
        this.setState({
            displayChatAutomationPopup:false,
            turnOffChat: "turnOnActiveStatus",
            chatAutomation:false,
        });
        
    }

    onClickOk_Auto(){
         this.setState({
            displayChatAutomationPopup:false,
            turnOffChat:"allContacts", 
            displayStatusLabel:true,
        });
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

        if (e.target.value != "allContactsExcept") {
          this.setState({showExceptWarning: false});
        }
    }

    createTurnOffChatPopup() {
        let visited = JSON.parse(localStorage.featuresVisited);
        visited.chat.settings = true;
        localStorage.setItem("featuresVisited", JSON.stringify(visited));
        this.setState({renderChatPopup: true});
    }

    parseText(str) {
      var raw_list = str.split(",").map(function(item) {
        return item.trim();
      });

      var friends = JSON.parse(localStorage.getItem('users')).filter((user) => {
        return user.friend;
      }).map((item) => {
        return item.name;
      });

      return raw_list.filter((item) => {
        return containsIgnoreCase(friends, item);
      });
    }

    updateSettings() {
        this.setState({turnOffChat: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][0],
          except_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1].join(", "),
          some_contacts: JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2].join(", ")});
    }

   
    //To automate or normally display the chat setting
    renderChat(){
        if (this.state.chatAutomation && this.state.displayChatAutomationPopup){
            return (
                <div>
                 <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
                 
                 {/*<Button href='javascript:void(0)' onClick={this.onClickUndo}><span id ='chat-auto' style={No_highLight}>Chat was automatically turned off</span> Undo</Button>*/}
               </div> 
                
                
            )
        }
        return(
            <div>
                <span className={this.state.chatHighlight?"high":null}><Menu ref={(_menu) => {this.menu = _menu}} upwards icon='gear'>
                    
                    <Button onClick={this.createTurnOffChatPopup} adapt={this.state.chatHighlight?"high":null}>Turn Off Active Status</Button>
                  
                </Menu>
                </span>

                {this.state.chatSuggestion && this.state.renderSuggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree ={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>}
            </div>
        )
    }
    
    cancelAllContacts(){
        this.setState({turnOffChat: "turnOnActiveStatus"});

        registerEvent("Active Status","Turned on Active Status","Chat Area")
    }
    
    forceUpdateHandler(){
        this.forceUpdate();
    }

    render() {
      var chats = []
      this.state.chats.forEach((name, index, array) => {
          chats.push(<ChatWindow key={index} name={name} destroy={this.removeChat} />);
      });

      var friend_names = [];
      var friends = [];
      JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
        if (!user.friend) {
          return;
        }
        
        var name = user.name;
        var setting = this.state.turnOffChat;
        var except_contacts_includes = containsIgnoreCase(JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][1], name);
        var some_contacts_includes = containsIgnoreCase(JSON.parse(localStorage.getItem('settings'))["turn_off_chat"][2], name);

        ////setting == "allContacts"
          //#chat-user a .allContacts
       // console.log('settings: '+setting )
        /* if ((setting == "allContactsExcept" && !except_contacts_includes)
          || (setting == "someContacts" && some_contacts_includes)) {
          return;
        } */
        
        friend_names.push(name);
        friends.push(<ChatUser key={index} chat={this} name={name} allContacts={setting === "allContacts" && setting != "turnOnActiveStatus" || this.state. chatAutomation? true:false}/>);
      });
      

      var except_text;
      var some_text;
      if (this.state.turnOffChat === "allContactsExcept") {
         except_text = <AutocompleteInput
            commaSeperated
            onChange={(value) => this.setState({except_contacts: value})}
            defaultValue={this.state.except_contacts}
            placeholder='Required: Enter names or lists'
            list={friend_names} />
      }
      else if (this.state.turnOffChat === "someContacts") {
         some_text = <AutocompleteInput
            commaSeperated
            onChange={(value) => this.setState({some_contacts: value})}
            defaultValue={this.state.some_contacts}
            placeholder='Optional: Enter names or lists'
            list={friend_names} />
      }

      var except_warning;
      if (this.state.showExceptWarning) {
         // TODO: Note that despite the fact that FriendBook's feature was changed from "turn off chat" to "turn off active status", this notice remains unchanged on FriendBook!
         except_warning = (
            <p className="popup-note" id="except-warning">
            Note: If "Turn off active status for all contacts except..." is selected but no contacts are entered into the box, you will be offline to all contacts.
            Please either enter a list of contacts you'd like to be online to or choose another option.
            </p>
         );
      }

      var turnOffChatPopup = (
         <Popup title="Turn Off Chat"
            destroy={(cancel=false) => {
               if (!cancel && this.state.turnOffChat == "allContactsExcept" && this.state.except_contacts == "") {
                  return;
               }
               this.setState({renderChatPopup: false});
            }}
            okay={() => {
               if (this.state.turnOffChat == "allContactsExcept" && this.state.except_contacts == "") {
                  this.setState({showExceptWarning: true});
                  return;
               }else if(this.state.turnOffChat =="allContacts"){
                    this.setState({displayStatusLabel:true});
                } else {
                  this.setState({showExceptWarning: false});
               }
               var settings = JSON.parse(localStorage.getItem('settings'));
               var old_settings = JSON.parse(JSON.stringify(settings));
               settings["turn_off_chat"][0] = this.state.turnOffChat;
               settings["turn_off_chat"][1] = this.parseText(this.state.except_contacts);
               settings["turn_off_chat"][2] = this.parseText(this.state.some_contacts);
               localStorage.setItem('settings', JSON.stringify(settings));
               this.updateSettings();

               //console.log(settings, old_settings)
               if (JSON.stringify(settings) != JSON.stringify(old_settings)) {
                  let used = JSON.parse(localStorage.featuresUsed);
                  used.chat.settings = true;
                  localStorage.setItem("featuresUsed", JSON.stringify(used));
               }
                  
               
                if(this.state.chatHighlight) {
                     this.setState({ chatHighlight:false,})
                    HighlightBoilerplate(this.state.context);
                }
            }}
            cancel={() => {this.updateSettings()}}>
            {/* https://www.w3schools.com/howto/howto_js_autocomplete.asp */}
            <label className={this.state.chatHighlight?"high1":null}>
              <input type="radio" id="turn-off-chat-all-contacts"
                  name="turn-off-chat" value="allContacts"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "allContacts"} />
               Turn off active status for all contacts
            </label>

            <label>
               <input type="radio" id="turn-off-chat-all-contacts-except"
                  name="turn-off-chat" value="allContactsExcept"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "allContactsExcept"} />
               Turn off active status for all contacts except...
               {except_text}
            </label>

            <label>
               <input type="radio" id="turn-off-chat-some-contacts"
                  name="turn-off-chat" value="someContacts"
                  onChange={this.handleTurnOffChatOptionChange}
                  checked={this.state.turnOffChat === "someContacts"} />
               Turn off active status for only some contacts...
               {some_text}
            </label>

            <p className="popup-note">
            Your friends and contacts will see when you're active or recently active.
            You'll appear active or recently active unless you turn off the setting every place you're using mezzenger or FriendBook.
            You'll also see when your friends and contacts are active or recently active.
            </p>
            {except_warning}  
        </Popup>);
          
        // TODO: Consider if there's a better solution than this warning
        var turned_off_warning;
        if (this.state.turnOffChat == "allContacts" && this.state.displayStatusLabel) {
           turned_off_warning = <p><a href="javaScript:void(0)" onClick={this.cancelAllContacts}>Turn on Active Status</a> to see who's available</p>;
        }

        return (
            <div id='chat-container'>
                <div id='chat-window-container'>
                    {chats}
                </div>
                <div id='chat'>
                    {this.state.renderChatPopup ?  turnOffChatPopup  : null}
                   <div className="chat_header">CONTACTS</div>
                    {friends}
                    <div id='chat-footer'>
                        <div id='settings'>
                          {turned_off_warning}
                          {this.renderChat()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
