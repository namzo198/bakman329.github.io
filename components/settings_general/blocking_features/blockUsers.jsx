import React,{Component} from 'react';
import Button from '../../Button.jsx';
import Popup from '../../Popup.jsx'
import {levenshteinDistance} from '../../../algorithms.js'
import {friendsList,addToLocalStorageObject,getProfilePic,getParsed,saveVisitedAdaptation, blockFriend} from '../../../utilities.js';
import AutomationBoilerplate from '../../../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import classNames from 'classnames'

/**
So, the users_friendship is being updated based on the current changes being made to it,  however it is gotten from the friendsList function that keeps getting updated based on the users being blocked. I therefore need to find a way to keep the original list in sysnc with the updated list without shortening the users list.
**/

class BlockUsers extends React.Component {
  constructor(props) {
    super(props);
      
    let adaptation = getParsed('adaptations');
    let adaptationVisited = getParsed("visited");
      
    this.state = {username: '', 
                  high_username:'Ira Slipan',
                  renderPopup:false, 
                  friendsList:friendsList(),
                  renderUltimateBlock:false,
                  blockedUserslist:JSON.parse(localStorage.getItem('blockedUsers')),
                  showUnblockPopup:false, 
                  highlight: !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")?true:false,
                  suggestion: !adaptationVisited ["Block_User"]["suggestion"]&& (adaptation["block_User"] === "sugst"),
                  automation:!adaptationVisited ["Block_User"]["automation"]&& (adaptation["block_User"] === "auto"),
                  displayAutomationPopup:true,
                  displaySuggestionPopup:true,
                  
                  action:"Adapation of Block_User of Ira Siplan",
                  context:"Block_User",
                  label_Sugst:" Hi Alex - Posts by Ira Siplan have repeatedly been flagged as abusive. Do you want to block Ira?",
                  label_Auto: "The grayed out and underlined person was automatically blocked.",
            };
      
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_high = this.handleChange_high.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.onClickUltimateBlock = this.onClickUltimateBlock.bind(this);
    this.onClickUnblock = this.onClickUnblock.bind(this);
    this.showBlockedUsers = this.showBlockedUsers.bind(this);
      
    this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
    this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
      
    this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
    this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      
      
  }


    
 /*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        
        this.setState({
            username:'Jack Scout'
        })
        
        this.onClickBlock()
    }
    
//Methods for the Automation Adaptation
   onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
   onClickUndo_Auto(){
        
       
       var list_Length = this.state.blockedUserslist.length;
       this.onClickUnblock(this.state.blockedUserslist[list_Length - 1]);
       
       if(this.state.blockedUserslist.length === 0){
            this.setState({
                //blockedUserslist: unblockUsers,
                displayAutomationPopup:false
            })
       }
    }
    
    
handleChange(email) {
 
   this.setState({username: email.target.value});
    
   // console.log("In the handleChange" +username)
 }

handleChange_high(name){
    this.setState({high_username:name.target.value})   
}
    
onClickBlock(){
    this.setState({renderPopup:true})                  
}
    
cancel(what){

    if(what ==='first'){
        this.setState({renderPopup:false})  
    }
    
    if (what === 'second'){
        this.setState({renderUltimateBlock:false,
                       username: " ",
                      friendsList:friendsList(),})
    }
    
    if(what =='third'){
        this.setState({showUnblockPopup:false})
    }
}
  
/*setLocalStorage(){
 //localStorage.setItem('blockedUsers',JSON.stringify(this.state.blockedUserslist))  
    addToLocalStorageObject('blockedUsers',this.state.blockedUserslist);
}*/
    
allowed(event){
   
    var  friend_name = this.state.username;
    var blockedUsers = this.state.blockedUserslist;
    
   blockFriend(friend_name,"Privacy Setting");
    
    if (blockedUsers.indexOf(friend_name === -1)) {
        blockedUsers.push(friend_name)
    }
    
 
   /* //Change friendship status in users localStorage
    this.state.friendsList.forEach((element,index) => {
     
        if(element.name === blockedFriend){
            element['friend'] = false;
        }
        
        
    });
    
     addToLocalStorageObject('users', this.state.friendsList);
    addToLocalStorageObject('blockedUsers',this.state.blockedUserslist);*/

    //this.setLocalStorage(); 
    
    this.cancel('second')
    this.cancel('first')
    
    //if highlight Adaptation, clear the input value
    if (this.state.highlight) {
      
        
        this.setState({
            highlight:false,
            high_username:" ",
        })
        
        //console.log("I cleared the input")
        
        saveVisitedAdaptation("Block_User","highlight");
       
    }
    
 
   
//saveVisitedAdaptation("Privacy_futureRequests","highlight");
                 
}
     
onClickUltimateBlock(user){
   this.setState({
       renderUltimateBlock:true, 
       username:user})
}

UltimateBlock(){
     return (
     <Popup title = {`Are you sure you want to block ${this.state.username}?`} cancel = {()=>{this.cancel('second')}} 
     okay = {()=>{
         this.allowed();
         let used = JSON.parse(localStorage.featuresUsed);
         used.block.user = true;
         localStorage.setItem("featuresUsed", JSON.stringify(used));
     }}
      okButtonName = {`Block ${this.state.username.split(" ")[0]}`} destroy = {() => {null}}> 
       <div>
          <div className="popup_imgwrap">
           <img src='../../assets/warning.png' width="53" height="48"/>
           </div>
           <div className="popup_content">
               <div><h4>{this.state.username} will no longer be able to:</h4></div>
               <ul>
                   <li>See things you post on your timeline</li>
                   <li>Tag you</li>
                   <li>Invite you to events or groups</li>
                   <li>Start a conversation with you</li>
                   <li>Add you as a friend</li>
               </ul>
               <div className="popup_content_2">If you're friends, blocking {this.state.username} will also unfriend him.</div>
               
              <div className="popup_content_2">If you just want to limit what you share with {this.state.username} or see less of him on Fakebook, you cacn <a href="javascript:void(0)">take a break</a> from him instead </div> 
              
               <div className ="popup_content_border"> </div>
               
               <div className="popup_content_2">Instead, you may want to send {this.state.username} a message because he might not know he is bothering you.  <a href="">Let him know.</a></div>     
           
           </div>
        </div>  
    </Popup>
     )   
}
    
BlockPopup(){
    
    var pop;
    
    if(this.state.username !== ''|| (this.state.highlight)) {
          var user;
        //this is hard coded for the highlight adaptation
        if (this.state.highlight) {
          user = this.state.high_username;
        } else {
          user = this.state.username;
        }
        
        var foundelements = [];
        var found = false;
        
        //console.log("The friendlist is as follows:");
        //console.log(this.state.friendsList);
        this.state.friendsList.forEach((element,index) => { 
            

            
        var editdistance = levenshteinDistance(user,element.name);
            //I choose 7 for username input where it takes atleast 7 edits to arrive to exising usernames 
            
            if (editdistance <= 7 ){
                 found = true;
                 foundelements.push(element.name)
              } 
          })
                            
        pop = (
            //Popup has no okay button, just the x button to cancel
            
            <Popup title="Block People" cancel={()=>{this.cancel('first')}} noFooter={true} header_style={true} content_style={true} closeButton={true}>
                
                {!found? <div>No results found</div>:

                    <div>
                       <p>The list below shows results for people whose profile includes words similar to "{this.state.username}". These people may not be your friends or followers</p>

                        <ul className="BlockPopup">
                            {foundelements.map((element, index) => {
                                
                                var profile_image = getProfilePic(element);
                                //var profile_image = this.state.friend_profile[element].profile_pic;
                                //src={`../../../assets/users/${profile_image}`
                                
                                
                                
                                return <li key={index} > {element} 
                                <img className="blockImage" src={profile_image}/> 
                                
                                <span style={{marginLeft:'20px',}}><Button  type="cancel" href="javascript:void(0)" onClick={()=>{this.onClickUltimateBlock(element)}}> Block </Button></span> </li>
                            })}

                        </ul>
                    </div> 
                }
                
            </Popup>
         )
        
    }else{
        pop = (
            <Popup title="Invalid Search Query" cancel={()=>{this.cancel('first')}} width={900} height={10} closeButton= {true} closeButtonName="Close" content_style={true} header_style={true}>
               <p>Please type a valid query in the search box and try again</p> 
            </Popup>
        )
    }
    
    
    return pop;

}

allowUnblock(user){
   var Index = this.state.blockedUserslist.indexOf(user);
    this.state.blockedUserslist.splice(Index,1);
    
    //console.log('The user is'+user);
    //Change friendship status in users localStorage
    this.state.friendsList.forEach((element,index) => {
     
        
        if(element.name === user){
            element['friend'] = true;
            //console.log("The element name is"+element.name+"User is "+user);
        }
        
        
    });
    
    addToLocalStorageObject('users', this.state.friendsList);
    addToLocalStorageObject('blockedUsers',this.state.blockedUserslist);

    //this.setLocalStorage(); 
    this.cancel('third')
                
}
  
onClickUnblock(user){
    this.setState({
        showUnblockPopup:true,
        username:user
    })
 }

unblockUser(){
    
    //Find the index of the user from the array and then delete it from the array. 
    var user = this.state.username;
    
    return(
        
        <Popup title={`Unblock ${user}`} cancel={()=>{this.cancel('third')}} okay={()=> this.allowUnblock(user)} okButtonName ="Confirm" destroy={void(0)}>
        
             <div>Are you sure you want to unblock {user}</div>
                
                 <ul>
                     <li>{user} may be able to see your timeline or contact you, depending on your privacy settings</li>
                     <li>Tags you and {user} previously added of each other may be restored</li>
                     <li>You can remove tags of yourself on your activity log</li>
                 </ul>

             <div>Please remember you'll have to wait 48 hour before you can re-block {user}.</div> 
             
        </Popup>
        )   
    }
  
  showBlockedUsers(){
      
     if(this.state.blockedUserslist.length > 0){
        return (
           <div>
               <ul>
                {this.state.blockedUserslist.map((user,index)=>{
                   if(this.state.displayAutomationPopup && this.state.automation){
                       return (
                           <li key={index}><span className="righttop_text_onAutomation">{user}</span><Button href="javascript:void(0)" onClick={()=>{this.onClickUnblock(user)}}>Unblock</Button>    
                           </li>
                       )
                       
                   }else {
                       return (
                           <li key={index} style={{marginBottom:'3px'}}><span className={user === "Ira Slipan"?"block_high1":null}>{user}</span>
                              
                              <span style = {{marginLeft:'10px',}}><Button href="javascript:void(0)" onClick={()=>{this.onClickUnblock(user)}}>Unblock</Button></span>
                            </li>)
                 }
                    
                      
                })}
                </ul>
                
                {/*The Automation Adaptation Popup*/ 
                this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
               }
            </div>
          )
         
         
       }
      
  }     
    
render(){
    
    var block_value_high_style = classNames({
        'block_value': !this.state.highlight,
        'block_value_high': this.state.highlight,
    })
  
    //console.log("The highlight state is "+ this.state.highlight)
       // console.log("The highlight name is "+ this.state.high_username)
return (
    
        <div>
            <div>
            <h2 className = "right_header"> Manage blocking </h2>
            </div>
            <hr/>
            <br/>
            <div id="right_top">
            <span className="righttop_label"> Restricted List </span>
                <a className="right_link" href="#"> Edit List </a>
                <div className = "righttop_text">
                  When you add a friend to your Restricted list, they won't see posts on Fakebook that you share to Friends only.
                  They may still see things that you share to Public or on a mutual friend's timeline, and posts that they're tagged in.
                   Fakebook doesn't notify your friends when you add them to your Restricted list. <a href="#">Learn more</a>
                  </div>
            </div>
            <hr/>

            <div id="right_bottom">
                <span className="rightbottom_label"> Block users </span>
                <div className= "rightbottom_text"> 
                     Once you block someone, that person can no longer see things you post on your timeline, tag you, invite
                      you to events or groups,start a conversation with you, or add you as a friend.
                      Note: Does not include apps, games or groups you both participate in.
                </div>
                
                <div id="right_bottom_form">
                    <label> Block users
                    
                        {/*<input id = "text" type="text"className = {block_value_high_style} placeholder = "Add name or email"defaultValue={this.state.highlight?this.state.high_username:""} onChange={this.handleChange_high} />*/}
                     
                     
                     {this.state.highlight?
                       <input id = "text" className = "high1" type="text"   defaultValue ={this.state.high_username} onChange ={this.handleChange_high} /> 
                      :<input id = "text" type="text" placeholder = "Add name or email" onChange = {this.handleChange} />
                    }
                      
                    </label>
                    <span style={{marginLeft:"2px"}}> <Button href="javascript:void(0)" type="confirm" onClick={this.onClickBlock}>Block </Button> </span>
                    <br/>
                    
                    {this.state.renderPopup?this.BlockPopup():null}
                    {this.state.renderUltimateBlock?this.UltimateBlock():null}
                    {this.state.showUnblockPopup?this.unblockUser():null}
                    {this. showBlockedUsers()} 
                    {   /*The Suggestion Adaptation*/
                        this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                   }
                </div>
          </div>
        </div>
   
  );
 }
}

export default BlockUsers;
