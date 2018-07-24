import React from 'react';
import ReactDOM from 'react-dom';

import Button from './Button.jsx'
import Menu from './Menu.jsx'
import MenuButton from './MenuButton.jsx'
import ChatUser from './ChatUser.jsx'
import ChatWindow from './ChatWindow.jsx'
import Popup from './Popup.jsx'
import {highLight,No_highLight} from '../adaptations/Highlight.js'
import SuggestionPopup from '../adaptations/Suggestion.jsx'

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chats: [], renderChatPopup: false, turnOffChat: "someContacts", adapt:'', undo:false, context:'From Chat',renderSuggestion:false};
        this.turnOffChatPopup = null;

        this.addChat = this.addChat.bind(this);
        this.removeChat = this.removeChat.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleTurnOffChatOptionChange = this.handleTurnOffChatOptionChange.bind(this);
        this.createTurnOffChatPopup = this.createTurnOffChatPopup.bind(this);
        this.onClickUndo = this.onClickUndo.bind(this);
        this.show =this.show.bind(this);
    }

    componentWillMount(){
        this.setState({
            adapt:this.props.toAdapt
        })
        
        //Set a time on when to display the Suggestion. 
          setTimeout(()=>this.show(),5000)
        
    }
   

    //Show the Suggestion
    show(){
         this.setState({
             renderSuggestion:true
         })
     }

    addChat(name) {
        if (this.state.chats.includes(name)) {
            return false;
        }

        this.setState({'chats': [name].concat(this.state.chats)});
        this.forceUpdate();

        return true;
    }

    /*TODO, create event and send to DB*/
    onClickUndo(){
        this.setState({
            undo:true,
        })
        
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

    //To automate or normally display the chat setting
    renderChat(){
        if (this.state.adapt==='auto' &!this.state.undo){
            return (
                <MenuButton href='javascript:void(0)' onClick={this.onClickUndo}><span id ='chat-auto' style={No_highLight}>Chat was automatically turned off for all contacts except Jack Roe</span> Undo</MenuButton>
            )
        } else{
            
            
            if (this.state.adapt==='sugst'){
            
                  var Suggestion_Popup=(
                    <SuggestionPopup title="Suggestion" allow={()=>{
                            
                            
                            var event={
                                action:'Accept to turn off chat',
                                context:this.state.context,
                                name:'This is the Chat suggestion to turn off chat for all except Jack Crow',
                                renderSuggestion:false
                            }
                            this.setState(event)
                            
                            return event
                            
                        }}  
                        
                        destroy={()=>{
                        
                            var event={
                                action:'Would rather not turn off chat',
                                context:this.state.context,
                                name:'This is the Chat suggestion to turn off chat for all except Jack Crow',
                                renderSuggestion:false
                            }
                            this.setState(event)
                            
                            return event
                            
                        }}>
                        
                        <label>
                            I think you should turn off chat for all contacts except Jack Crow.
                        </label>
                    </SuggestionPopup>)}
                  

            return(
                <div>
                    <Menu ref={(menu) => {this._menu = menu; }}>
                        <MenuButton href='javascript:void(0)' onClick={this.createTurnOffChatPopup} adapt={this.props.toAdapt}>Turn off chat</MenuButton>
                    </Menu>

                    {/* TODO: Figure out how we're doing icons, and replace this */}

                    <Button href='javascript:void(0)' onClick={this.toggleMenu} adapt={this.props.toAdapt}>*</Button>
                    
                    {this.state.renderSuggestion?Suggestion_Popup:null}
                </div>
            )
        }
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


                <label style={(this.state.adapt ==='high')?highLight:No_highLight}>
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

                            {this.renderChat()}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;