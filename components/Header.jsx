import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {getParsed} from '../utilities.js';
import Button from './Button.jsx'
import Settingsdropdown from './settings_general/Settingsdropdown.jsx'

class Header extends React.Component {
    constructor(props) {
        super(props);
        let adaptation = getParsed("adaptations")
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            adaptation:adaptation,
            adaptationVisited:adaptationVisited,
            renderSettings:false,
            highlight: !adaptationVisited["Privacy_futureRequests"]["highlight"]&&(adaptation["privacy_futureRequests"] == "high") || !adaptationVisited ["Timeline_seePost"]["highlight"]&& (adaptation["timeline_seePost"] === "high") || !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")||!adaptationVisited["Block_Event"]["highlight"] && (adaptation["block_Event"] == "high")||!adaptationVisited["Block_App"]["highlight"] && (adaptation["block_App"] == "high")||!adaptationVisited["Block_AppInvite"]["highlight"] && (adaptation["block_AppInvite"] == "high")? true: false,
            
            
            
        }
        
        this.changeIcon = this.changeIcon.bind(this);
        this.settingsdropDown = this.settingsdropDown.bind(this);
    }
    
    changeIcon(){
        this.setState ({
            highlight:false
        })
    }
    
    settingsdropDown() {
        console.log("I am in here");
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
               <img id='profile-pic' src='/assets/notifications.png'/> 
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
               
              
                {/*<Link to={{
               //pathname:'/settings_general/GeneralSettings'
              pathname:'/settings_general/Settingsdropdown',
               state:{fromHeader:true}}} onClick={this.changeIcon}>
               
               { this.state.highlight?
               <img id='profile-pic' src='/assets/settings4.png'/>:
               
                <img id='profile-pic' src='/assets/settings.png'/>
                
               }
                
               
                </Link> */}
               
              </p>
              
               {this.state.renderSettings?<Settingsdropdown SettingsdropDown={this.settingsdropDown} changeIcon={this.changeIcon}/>:null}
             
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;