import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {getParsed} from '../utilities.js';
import Button from './Button.jsx'
import Settingsdropdown from './settings_general/Settingsdropdown.jsx'
import Notificationsdropdown from './notifications/Notificationdropdown.jsx'

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
    
    /*changeIcon(){
        this.setState ({
            highlight:false
        })
    }*/
    
    notification() {
        
         this.setState( (prevState, props) => ({
            renderNotification:!prevState.renderNotification,
             showNotificationIcon:false,
        }));
    }
    
    settingsdropDown() {
        
        this.setState( (prevState, props) => ({
            
            renderSettings:!prevState.renderSettings,
        }));
         
    }
    
  render() {
    return (
      <header>
        <Link to={{
            pathname:'/',
            state:{fromHeader:true}}}><h1 id="logo">FriendBook</h1>
        </Link>
        
        <div id='user'>
          <Link to={{
                pathname:'/profile/Alex_doe',
                    state:{fromNewsFeed:true}}}><img id='profile-pic' src='/assets/users/alex_profile_img.jpg'/><span id='header-text'>  Alex</span></Link>
                    
                    
           
          <div id='header-text'>
           
            <p><Link to={{
                pathname:'/',
                    state:{fromNewsFeed:true}}}><span>Home</span></Link>
            </p> 
                 
            <p>Create</p>
            
             <p>
               <img id='profile-pic' src='/assets/findfriends.png'/> 
            </p>
            
             <p>
               <img id='profile-pic' src='/assets/messages.png'/> 
            </p>
            
            <p>
               <Button onClick={this.notification}> 
                <img id='profile-pic' src={this.state.showNotificationIcon? '/assets/notifications3.png':'/assets/notifications.png'}/>
              </Button>
             </p>
            
            <p>
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
              
               {this.state.renderSettings?<Settingsdropdown SettingsdropDown={this.settingsdropDown} changeIcon={this.changeIcon}/>:null}
             
               {this.state.renderNotification?<Notificationsdropdown notification={this.notification}/> :null}
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;