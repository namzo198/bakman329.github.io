import React,{Component} from 'react';
import Popup from '../Popup.jsx'
import Button from '../Button.jsx';

class Apps extends Component {
constructor(props){
    super(props)
    
    this.state = {
        toggle:false,
        decision:false
    }
    this.onClickEdit = this.onClickEdit.bind(this);
    this. onClickCancel = this.onClickCancel.bind(this);
    this.onClickTurnOn = this.onClickTurnOn.bind(this);
}
    
onClickEdit(){
    
 this.setState({
        toggle:true
 })  
    
}  
 onClickCancel(){
    
     this.setState({
        toggle:false
 })  
 }

 onClickTurnOn(){
     
     this.setState({
         decision: !this.state.decision
     })
     
     this.onClickCancel();
     
 }

    
popup(){
    // TODO: Error on destroy
    return(
    <Popup title = {"Game and app notifications"} cancel={this.onClickCancel} okay={this.onClickTurnOn} >
      
     {this.state.decision? 
        <div>
      <div><b>Game and app notifications are turned on</b></div>
      <br/>
      
      <div>
        Turning off game and app notifications will hide those notifications on FriendBook and Gameroom. It will not affect your ability to use apps or play games.
       </div></div>:
      
        <div><div><b>Game and app notifications are turned off</b></div>
         <br/>
        <div>
        Turning on game and app notifications will re-enable those notifications on FriendBook and Gameroom based on your previous settings
        </div></div>
     }
    </Popup>
    )
}
    
render() {
    
  return (
    <div className="right">
      <div className = "right_header_1"> Preferences </div>
      <div className ="blocks">
        <div className ="block_1">

         <div className="block1_icon"> <div className ="block_header">  Game and app notifications </div> </div>
        <div className ="block_content"> This setting controls game requests from friends and game status updates,
           and app notifications from app developers on FriendBook and Gameroom.
            Changing this setting will not affect your ability to use apps or play games.
          </div>
          <div>
          <div className = "toggle">  Notifications are turned {this.state.decision? "on":"off"}   </div>
              
              
              <Button onClick={this.onClickEdit}><span id="button">Edit</span></Button>
              
              {this.state.toggle?this.popup():""}
        </div>

        </div>
      </div>
     </div>
  );
 }
}

export default Apps;