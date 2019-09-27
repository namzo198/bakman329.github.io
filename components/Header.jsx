import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {getParsed,registerEvent} from '../utilities.js';
import Button from './Button.jsx'
import Settingsdropdown from './settings_general/Settingsdropdown.jsx'
import Notificationdropdown from './notifications/Notificationdropdown.jsx'

class Header extends React.Component {
    constructor(props) {
        super(props);
        let adaptation = getParsed("adaptations")
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            adaptation:adaptation,
            adaptationVisited:adaptationVisited,
            renderSettings:false,
            renderNotification:false,
            showNotificationIcon:true,
            highlight: !adaptationVisited["Privacy_futureRequests"]["highlight"]&&(adaptation["privacy_futureRequests"] == "high") || !adaptationVisited ["Timeline_seePost"]["highlight"]&& (adaptation["timeline_seePost"] === "high") || !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")||!adaptationVisited["Block_Event"]["highlight"] && (adaptation["block_Event"] == "high")||!adaptationVisited["Block_App"]["highlight"] && (adaptation["block_App"] == "high")||!adaptationVisited["Block_AppInvite"]["highlight"] && (adaptation["block_AppInvite"] == "high")? true: false,   
        }
        //this.changeIcon = this.changeIcon.bind(this);
        this.settingsdropDown = this.settingsdropDown.bind(this);
        this.notification = this.notification.bind(this);
    }
    
    
    notification() {
        
         this.setState( (prevState, props) => ({
            renderNotification:!prevState.renderNotification,
             showNotificationIcon:false,
             renderSettings: false
        }));
        
         registerEvent("Clicked on the Notification button", 'to open the notifications drop down ', 'Header');    
        
    }
    
    settingsdropDown() {
        
        this.setState( (prevState, props) => ({
            
            renderSettings:!prevState.renderSettings,
            renderNotification: false
        }));
        
         registerEvent("Clicked on the privacy settings dropdown button", 'to open the settings drop down', ' Header'); 
         
    }
    
    registerClick(action,details,point_of_action){
  
         registerEvent(action, details, ' From '+point_of_action);    
    }

    
  render() {
    return (
      <header>
        <Link to={{
            pathname:'/',
            state:{fromHeader:true}}} onClick={() => this.registerClick('Clicked on the FriendBook Button', 'to go to the NewsFeed','Header')}><h1 id="logo">FriendBook</h1>
        </Link>
        
        <div id='user'>
          <Link to={{
                pathname:'/profile/alex_doe',
                    state:{fromNewsFeed:true}}} onClick={() => this.registerClick("Clicked on Alex Doe'\s","profile link to visit their profile page",'Header')}><img id='profile-pic' src='/assets/users/alex_profile_img.jpg'/><span id='header-text'>  Alex</span></Link>
                    
                    
           
          <div id='header-text'>
            <p><Link to={{
                pathname:'/',
                    state:{fromNewsFeed:true}}} onClick={() => this.registerClick('Clicked on the Home Button', 'to go to the NewsFeed','Header')}><span>Home</span></Link>
            </p> 
                 
            <p data-tip="Not Implemented">Create</p>
           
         
             <p data-tip="Not Implemented">
               <img id='profile-pic' src='/assets/findfriends.png' /> 
             </p>
            
             <p data-tip="Not Implemented">
               <img id='profile-pic' src='/assets/messages.png'/> 
            </p>
            
            <p>
               <Button onClick={this.notification}> 
                <img id='profile-pic' src={this.state.showNotificationIcon? '/assets/notifications3.png':'/assets/notifications.png'}/>
              </Button>
             </p>
            
            <p data-tip="Not Implemented">
               <img id='profile-pic' src='/assets/quick_help.png'/>
            </p>
            
            <p>
             
                 <Button onClick={this.settingsdropDown}>
                  { this.state.highlight?
                   <img id='profile-pic' src='/assets/settings4.png'/>:

                    <img id='profile-pic' src='/assets/settings.png'/>

                   }
                   </Button>
              </p>
              
               {this.state.renderSettings?<Settingsdropdown SettingsdropDown={this.settingsdropDown} destroy={() => this.setState({renderSettings: false})} changeIcon={this.changeIcon}/>:null}
             
               {this.state.renderNotification?<Notificationdropdown notification={this.notification} destroy={() => this.setState({renderNotification: false})} /> :null}
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
