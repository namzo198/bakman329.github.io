import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {getParsed} from '../utilities.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        let adaptation = getParsed("adaptations")
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            adaptation:adaptation,
            adaptationVisited:adaptationVisited,
            highlight: !adaptationVisited["Privacy_futureRequests"]["highlight"]&&(adaptation["privacy_futureRequests"] == "high") || !adaptationVisited ["Timeline_seePost"]["highlight"]&& (adaptation["timeline_seePost"] === "high") || !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")? true: false,
            
        }
        
        this.changeIcon = this.changeIcon.bind(this);
    }
    
    changeIcon(){
        this.setState ({
            highlight:false
        })
    }
    
  render() {
    return (
      <header>
        <Link to={{
            pathname:'/',
            state:{fromHeader:true}}}><h1 id="logo">fakebook</h1>
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
              <Link to={{
               pathname:'/settings_general/GeneralSettings',
               state:{fromHeader:true}}} onClick={this.changeIcon}>
               
               { this.state.highlight?
               <img id='profile-pic' src='/assets/settings4.png'/>:
               
                <img id='profile-pic' src='/assets/settings.png'/>
                
               }
                
               
               </Link>
              </p>
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;