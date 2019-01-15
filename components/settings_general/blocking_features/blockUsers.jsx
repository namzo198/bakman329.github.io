import React,{Component} from 'react';
import Button from '../../Button.jsx';
import Popup from '../../Popup.jsx'
import {levenshteinDistance} from '../../../algorithms.js'


class BlockUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', renderPopup:false, friendsList:[],renderUltimateBlock:false,blockedUserslist:[],showUnblockPopup:false};
    this.handleChange = this.handleChange.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.onClickUltimateBlock = this.onClickUltimateBlock.bind(this);
    this.onClickUnblock = this.onClickUnblock.bind(this);
      this. 
  showBlockedUsers = this.showBlockedUsers.bind(this);
      
      
  }

componentDidMount(){
    var blockedUsers = JSON.parse(localStorage.getItem('blockedUsers'));
    var friends = JSON.parse(localStorage.getItem('friends'))
    
    //console.log('The blocked'+  blockedUsers)
    
    this.setState({
       blockedUserslist: blockedUsers,
       friendsList: friends
    })
    
    //console.log('The state blocked' +this.state.blockedUserslist.length)
}
    
handleChange(email) {
   this.setState({username: email.target.value});
 }

onClickBlock(){
    this.setState({renderPopup:true})                  
}
    
cancel(what){

    if(what ==='first'){
        this.setState({renderPopup:false})  
    }else if (what === 'second'){
        this.setState({renderUltimateBlock:false })
    }else if(what =='third'){
        this.setState({showUnblockPopup:false})
    }
}
  
setLocalStorage(){
 localStorage.setItem('blockedUsers',JSON.stringify(this.state.blockedUserslist))  
}
    
allowed(){
   
    this.state.blockedUserslist.push(this.state.username)
    this.setLocalStorage(); 
    
    this.cancel('second')
    this.cancel('first')
                 
}
     
onClickUltimateBlock(user){
   this.setState({
       renderUltimateBlock:true, 
       username:user}) 
}

UltimateBlock(){
     return (
     <Popup title = {`Are you sure you want to block ${this.state.username}?`} cancel={()=>{this.cancel('second')}} 
                
        okay = {()=>{this.allowed()}} > 
       <div>
          <div className="popup_imgwrap">
           <img src='../../assets/warning.png' width="53" height="48"/>
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
        </div>  
    </Popup>
     )   
}
    
BlockPopup(){
    
    var pop;
    
    if(this.state.username !== '') {
        
        var user = this.state.username;
        var foundelements = [];
        var found = false;
        
        this.state.friendsList.map((element, index) => {           
        var editdistance = levenshteinDistance(user,element);
            //I choose 7 for username input where it takes atleast 7 edits to arrive to exising usernames 
            if (editdistance <= 7 ){
                 found = true;
                 foundelements.push(element)
              } 
          })
                            
        pop = (
            //Popup has no okay button, just the x button to cancel
            <Popup title="Block People" cancel={()=>{this.cancel('first')}}>
                
                {!found? <div>No results found</div>:

                    <div>
                       <p>The list below shows results for people whose profile includes words similar to "{this.state.username}". These people may not be your friends or followers</p>

                        <ul className="BlockPopup">
                            {foundelements.map((element, index) => {
                                return <li key={index}> {element} <Button href="javascript:void(0)" onClick={()=>{this.onClickUltimateBlock(element)}}> Block </Button> </li>
                            })}

                        </ul>
                    </div> 
                }
                
            </Popup>
         )
        
    }else{
        console.log(' Invalid Search Query: Please type a valid query in the search box and try again')
        pop = (
            <Popup title="Invalid Search Query" cancel={()=>{this.cancel('first')}}>
               <p>Please type a valid query in the search box and try again</p> 
            </Popup>
        )
    }
    
    
    return pop;

}

allowUnblock(){
   var Index = this.state.blockedUserslist.indexOf(user);
    this.state.blockedUserslist.splice(Index,1);
    
    this.setLocalStorage(); 
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
        
        <Popup title={`Unblock ${user}`} cancel={()=>{this.cancel('third')}} okay={()=> this.allowUnblock()}>
        
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
                   return <li key={index}>{user} <Button href="javascript:void(0)" onClick={()=>{this.onClickUnblock(user)}}>Unblock</Button></li>
                })}
                </ul>
            </div>
          )
       }
      
  }     
    
render(){
  
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
                  When you add a friend to your Restricted list, they won't see posts on Facebook that you share to Friends only.
                  They may still see things that you share to Public or on a mutual friend's timeline, and posts that they're tagged in.
                   Facebook doesn't notify your friends when you add them to your Restricted list. <a href="#">Learn more</a>
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
                      <input id = "text" type="text" placeholder="Add name or email" onChange={this.handleChange} />
                    </label>
                    <Button href="javascript:void(0)" onClick={this.onClickBlock}>Block </Button>
                    <br/>
                    
                    {this.state.renderPopup?this.BlockPopup():""}
                    {this.state.renderUltimateBlock?this.UltimateBlock():""}
                    {this.state.showUnblockPopup?this.unblockUser():""}
                    {this. showBlockedUsers()} 
                </div>
          </div>
        </div>
   
  );
 }
}

export default BlockUsers;