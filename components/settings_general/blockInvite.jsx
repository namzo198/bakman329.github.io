import React,{Component} from 'react';
import Button from '../Button.jsx';
import Popup from '../Popup.jsx'
import {levenshteinDistance} from '../../algorithms.js'


class BlockInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', renderPopup:false, list:["Jack Roe", "Jim Mend"],renderUltimateBlock:false,blockedUserslist:[], showBlockedusers:false,showUnblockPopup:false};
    this.handleChange = this.handleChange.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.onClickUltimateBlock = this.onClickUltimateBlock.bind(this);
    this.onClickUnblock = this.onClickUnblock.bind(this);
      
      
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
    
allowed(){
    console.log('Okayed')
    this.state.blockedUserslist.push(this.state.username) 
              
    this.cancel('second')
    this.cancel('first')
                
    this.setState({
        blockedUserslist:this.state.blockedUserslist,
        showBlockedusers:true
    })
                 
}
     
onClickUltimateBlock(){
   this.setState({renderUltimateBlock:true }) 
}

UltimateBlock(){
     return (
     <Popup title = {`Are you sure you want to block ${this.state.username}?`} destroy={()=>{this.cancel('second')}} 
                
        okay = {()=>{this.allowed()}} > 
       <div>
           <img src='../../assets/warning.png' width="53" height="48"/>
           <div>
               <div><h4>{this.state.username} will no longer be able to:</h4></div>
               <ul>
                   <li>See things you post on your timeline</li>
                   <li>Tag you</li>
                   <li>Invite you to events or groups</li>
                   <li>Start a conversation with you</li>
                   <li>Add you as a friend</li>
               </ul>
               <div>If you're friends, blocking {this.state.username} will also unfriend him.</div>
               
              <div>If you just want to limit what you share with {this.state.username} or see less of him on Fakebook, you cacn <a href="javascript:void(0)">take a break</a> from him instead </div> 
              
               <div>.......</div>
               <div>Instead, you may want to send {this.state.username} a message because he might not know he is bothering you.  <a href="">Let him know.</a></div>     
           </div>
        </div>  
    </Popup>
     )   
}
    
BlockPopup(){
    
    var pop;
    
    var tea= levenshteinDistance("J ","Jack Roe ");
    
    
    
    console.log(tea);
    
    if(this.state.username !== '') {
        
        var user = this.state.username;
        var foundelements = [];
        var found = false;
        
        this.state.list.map((element, index) => {           
        var editdistance = levenshteinDistance(user,element);
            //I choose 7 for username input where it takes atleast 7 edits to arrive to exising usernames 
            if (editdistance <= 7 ){
                 found = true;
                 foundelements.push(element)
              } 
          })
                            
        pop = (
            //Popup has no okay button, just the x button to cancel
            <Popup title="Block People" destroy={()=>{this.cancel('first')}}>
                
                {!found? <div>No results found</div>:

                    <div>
                       <p>The list below shows results for people whose profile includes words similar to "{this.state.username}". These people may not be your friends or followers</p>

                        <ul className="BlockPopup">
                            {foundelements.map((element, index) => {
                                return <li key={index}> {element} <Button href="javascript:void(0)" onClick={this.onClickUltimateBlock}> Block </Button> </li>
                            })}

                        </ul>
                    </div> 
                }
                
            </Popup>
         )
        
    }else{
        console.log(' Invalid Search Query: Please type a valid query in the search box and try again')
        pop = (
            <Popup title="Invalid Search Query" destroy={()=>{this.cancel('first')}}>
               <p>Please type a valid query in the search box and try again</p> 
            </Popup>
        )
    }
    
    
    return pop;

}

allowUnblock(){
   var Index = this.state.blockedUserslist.indexOf(user);
    this.state.blockedUserslist.splice(Index,1);
    
    this.cancel('third')
                
    this.setState({
        blockedUserslist:this.state.blockedUserslist
    }) 
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
        
        <Popup title={`Unblock ${user}`} destroy={()=>{this.cancel('third')}} okay={()=> this.allowUnblock()}>
        
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
    
render(){
  
    
return (
<div id="container">
  <div id="wrapper_left">
    <ul id="info_left">
      <li> <a href="javascript:void(0)"> Privacy </a> </li>
      <li > <a  href="javascript:void(0)"> Blocking  </a> </li>
    </ul>
  </div>
  <div className="divider" > </div>
  <div id="wrapper_right">
    <div>
    <h2 id = "right_header"> Manage blocking </h2>
    </div>
  <hr/>
<br/>
  <div id="right_top">
    <span className="righttop_label"> Restricted List </span>
    <a className="right_link" href="#"> Edit List </a>
        <div className = "righttop_text"> When you add a friend to your Restricted list, they won't see posts on Facebook that you share to Friends only.
      They may still see things that you share to Public or on a mutual friend's timeline, and posts that they're tagged in.
       Facebook doesn't notify your friends when you add them to your Restricted list. <a href="#">Learn more</a>
      </div>
</div>
<hr/>

  <div id="right_bottom">
    <span className="rightbottom_label"> Block users </span>
    <div className= "rightbottom_text"> Once you block someone, that person can no longer see things you post on your timeline, tag you, invite
      you to events or groups,start a conversation with you, or add you as a friend.
      Note: Does not include apps, games or groups you both participate in.
    </div>
    <div id="right_bottom_form">
      <form onSubmit={this.handleSubmit}>
        <label> Block users
          <input id = "text" type="text" placeholder="Add name or email" onChange={this.handleChange} />
        </label>
          <Button href="javascript:void(0)" onClick={this.onClickBlock}>Block </Button>
        <br/>
      </form>
        
        {this.state.renderPopup?this.BlockPopup():null}
        {this.state.renderUltimateBlock?this.UltimateBlock():null}
       
        {this.state.showBlockedusers&&this.state.blockedUserslist.length > 0?
                
            <div>
               <ul>
                {this.state.blockedUserslist.map((user,index)=>{
                   return <li key={index}>{user} <Button href="javascript:void(0)" onClick={()=> {this.onClickUnblock(user)}}>Unblock</Button></li>
                })}
                </ul>
            </div>: null
           }
           
           {this.state.showUnblockPopup?this.unblockUser():null}
        
    </div>
  </div>
</div>
</div>

  );
 }
}

export default BlockInvite;