import React from 'react'
import AutocompleteInput from '../../AutocompleteInput.jsx'
import Button from '../../Button.jsx';

class BlockEventInvites extends React.Component {
    
     constructor(props){
    super(props);
    this.state = {  
      username: "",
      blockedFriendsList: []
    }
        
     this.handleChange = this.handleChange.bind(this);
     this.onEnter = this.onEnter.bind(this);
     this.showBlockedFriends = this.showBlockedFriends.bind(this);
     this.onClickUnBlock = this.onClickUnBlock.bind(this);
  }
    
    componentDidMount(){
        var blockedFriends = JSON.parse(localStorage.getItem('blockedEventInvites'))
        
        this.setState({
            blockedFriendsList:blockedFriends
        })
    }

    handleChange(friendname){
        this.setState({username:friendname})
      }

     setLocalStorage(){
        localStorage.setItem('blockedEventInvites',JSON.stringify(this.state.blockedFriendsList))
    }
    
      
    onEnter(friendname){
        this.state.blockedFriendsList.push(friendname)
        this.setLocalStorage();   
    }
    
     onClickUnBlock(friend){
        var Index = this.state.blockedFriendsList.indexOf(friend);
        this.state.blockedFriendsList.splice(Index,1);
        this.setState({
            blockedFriendsList:this.state.blockedFriendsList
        })
        this.setLocalStorage();
        
        var event = {
           action: `Unblock ${friend} from Event Invites`,
           context: 'Block event invites',
            name: 'John Doe'
        };
        return event;
    }
    
     showBlockedFriends(){
        if(this.state.blockedFriendsList.length >0){
            return(
            <div>
                <ul>
                    {this.state.blockedFriendsList.map((friend,index)=>{
                        return <li key={index}>{friend}<Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(friend)}>Unblock</Button></li>
                    })}
                </ul>
            </div>
            )
        }
    }
    
   render(){
       
        var autocomplete = <AutocompleteInput
       commaSeperated
       onChange={(value) => this.handleChange(value)}
       defaultValue =""
       placeholder = "Type the name of a friend"
       list = {JSON.parse(localStorage.getItem('friends'))}
       onEnter = {this.onEnter}
       />
            
       return (
         <div id="right_bottom">
            <span className="rightbottom_label"> Block event invitations  </span>
            <div className= "rightbottom_text">Once you've blocked event invitations from someone,
              you'll automatically ignore future event requests from that friend.
            </div>
            <div id="right_bottom_form">
              
              <label> Block invites from</label>
              {autocomplete}
              {this.showBlockedFriends()}
                <br/>
            
            </div>
          </div>
       )
   } 
}

export default BlockEventInvites;