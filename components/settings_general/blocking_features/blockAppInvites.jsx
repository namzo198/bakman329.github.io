import React from 'react'
import AutocompleteInput from '../../AutocompleteInput.jsx'
import Button from '../../Button.jsx';
import {friendsList,addToLocalStorageObject,getProfilePic,getParsed,saveVisitedAdaptation} from '../../../utilities.js'
import AutomationBoilerplate from '../../../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import HighlightBoilerplate from '../../../adaptations/Highlight/HighlightBoilerplate.jsx'
import {createEvent} from '../../../adaptations/Event.jsx'

class BlockAppInvites extends React.Component {
    constructor(props){
    super(props);
    
    let adaptation = getParsed('adaptations');
    let blockedFriends = getParsed("blockedAppInvites");     
    let adaptationVisited = getParsed("visited");
        
    let friends = friendsList();
    var friendslist = [];    
        friends.forEach((element, index) =>{
            friendslist.push(element.name);
        })
        
    this.state = {  
      username: "",
      blockedFriendsList:blockedFriends ,
      friendsList:friendslist,
      
        highlight: !adaptationVisited["Block_AppInvite"]["highlight"] && (adaptation["block_AppInvite"] == "high")?true:false,
        suggestion: !adaptationVisited ["Block_AppInvite"]["suggestion"]&& (adaptation["block_AppInvite"] === "sugst"),
        automation:!adaptationVisited ["Block_AppInvite"]["automation"]&& (adaptation["block_AppInvite"] === "auto"),
        displayAutomationPopup:true,
        displaySuggestionPopup:true,

        action:"Adaptation for Block_AppInvite Invitations from Jim Mend",    
        context:"Block_AppInvite",
        object:" blocking of Jim Mend", 
        objectSugst: "block Jim Mend",    
        label_Sugst:"Hi Alex - You have ignored several App Invites from Jim Mend. Do you want to block Jim’s App Invites?", 
        label_Auto: "The grayed out and underlined person was automatically blocked from sending you App Invites.", 
    }
        
     this.handleChange = this.handleChange.bind(this);
     this.onEnter = this.onEnter.bind(this);
     this.showBlockedFriends = this.showBlockedFriends.bind(this);
     this.onClickUnBlock = this.onClickUnBlock.bind(this);
        
    /*Suggestion functions*/
    this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
    this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
         
    /*Automation functions*/
    this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
    this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      
    let visited = JSON.parse(localStorage.featuresVisited);
    visited.notifications.app = true;
    localStorage.setItem("featuresVisited", JSON.stringify(visited));
  }

 /* componentDidMount(){
        var blockedFriends = JSON.parse(localStorage.getItem('blockedAppInvites'))
        
        this.setState({
            blockedFriendsList:blockedFriends
        })
    }*/
     /*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        this.state.blockedFriendsList.push("Jim Mend");
        
        this.setState({
             displaySuggestionPopup:false
        })  
    }
    
    
    handleChange(friendname){
        this.setState({username: friendname})
    }

    setLocalStorage(){
        localStorage.setItem('blockedAppInvites',JSON.stringify(this.state.blockedFriendsList))
    }
    
    onEnter(friendname){
        var event;
        var blockedAppList = this.state.blockedFriendsList;
        var friends = this.state.friendsList;
        
        if(friends.indexOf(friendname) >= 1 && blockedAppList.indexOf(friendname) === -1){
            blockedAppList.push(friendname)
        }
        
        this.setLocalStorage();  

        let used = JSON.parse(localStorage.featuresUsed);
        used.notifications.app = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));
        
        event = {
             action: `Block app invites`,
             object: `Pressed the Enter key`,
             context: `Block ${friendname} from sending app invites.Participant did this on their own`,
             
        };
        
       
        //When adaptation is highligh and enter is pressed
        if(this.state.highlight){
            
            this.setState({highlight:false})
            
            HighlightBoilerplate("Block_AppInvite")
      
        }
        
        
         this.setState({
          blockedFriendsList: blockedAppList
        })
       
       
       createEvent(event);
    }
    
    onClickUnBlock(friend){
        var Index = this.state.blockedFriendsList.indexOf(friend);
        this.state.blockedFriendsList.splice(Index,1);
        this.setState({
            blockedFriendsList:this.state.blockedFriendsList
        })
        this.setLocalStorage();
        
        var event = {
           action: `UnBlock App Invites`,
           object: `Pressed the unblock button to unblock friend`,
           context: `Unblock  ${friend} from App Invites. Participant did this on their own` 
        };
        return event;
    }
    
     //Methods for the Automation Adaptation
   onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
   onClickUndo_Auto(){
        
       
       var list_Length = this.state.blockedFriendsList.length;
       this.onClickUnBlock(this.state.blockedFriendsList[list_Length - 1]);
       
       if(this.state.blockedFriendsList.length === 0){
            this.setState({
                //blockedUserslist: unblockUsers,
                displayAutomationPopup:false
            })
       }
    }
    
    
    showBlockedFriends(){
        if(this.state.blockedFriendsList.length >0){
            return(
            <div>
                <ul>
                    {this.state.blockedFriendsList.map((friend,index)=>{
                        if(this.state.displayAutomationPopup && this.state.automation) {
                            
                            return (<li key={index}><span className="righttop_text_onAutomation">{friend}</span> <Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(friend)}>Unblock</Button></li>)
                            
                        }else {
                        return (
                        <li key={index}>{friend}
                          <span style = {{marginLeft:'10px',}}>
                              <Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(friend)}>Unblock </Button>
                          </span>
                        </li> )}
                    })}
                </ul>
                
                 {/*The Automation Adaptation Popup*/ 
                this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} object ={this.state.object} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
               }
               
            </div>
            )
        }
    }
    
   render(){
       
       
     var autocomplete = <AutocompleteInput
       className = {this.state.highlight? "high1":null}
       commaSeperated
       onChange={(value) => this.handleChange(value)}
       defaultValue = {this.state.highlight? "Jim Mend":""}
       placeholder = "Type the name of a friend"
       list = {this.state.friendsList}
       onEnter = {this.onEnter}
       />
           
       return (
           
        <div id="right_bottom">
          <span className="rightbottom_label"> Block app invites  </span>
          <div className= "rightbottom_text">Once you've blocked app invites from someone, you'll automatically ignore future app requests from that friend.
            To block invites from a specific friend, click the "Ignore all invites from this friend" link under your latest request.
          </div>
          <div id="right_bottom_form">
           
              <label> Block invites from</label>
              {autocomplete}
              {this.showBlockedFriends()}
              <br/>
         
          </div>
          
          {/*The Suggestion Adaptation*/
                 this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} object={this.state.objectSugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                }
                
        </div>
        
       )
   } 
}

export default BlockAppInvites;