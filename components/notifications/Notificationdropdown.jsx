import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {Link} from 'react-router-dom';



class Notificationdropdown extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        
        this.props.changeIcon();
        this.props.settingsdropDown();
    }
    
    render(){
       // console.log("I have been called");
        return (  
            
             <div id= "notification_container">
                    <div className="beeper"></div>
                     <div id="notification_header">
                         <div id = "header_top">
                             <h3> Notifications </h3>
                          <div id= "header_top_right">
                              <a> Mark all as read</a>
                             <a> Settings</a>
                          </div>
                         </div>
                     </div>
                     <br/>
                     
                    <div id = "dropdown_header">
                         <div className = "notification-id">
                             <img src="/assets/users/kyle_profile_img.jpg"/>
                             <ul>
                                 <li> Kyle Parker invited you to Rave Night </li>
                                     <a> Accept </a>
                                     <a> Decline </a>
                             </ul>
                         </div>
                         
                          <div className = "notification-id">
                             <img src="/assets/users/kyle_profile_img.jpg"/>
                             <ul>
                                 <li> Kyle Parker invited you to TwerkOut </li>
                                     <a> Accept </a>
                                     <a> Decline </a>
                             </ul>
                         </div>
                         
                         <div className = "notification-id">
                             <img src="/assets/users/jim_profile_img.jpg"/>
                             <ul>
                                 <li> Jim Mend invited you to play CandyOut </li>
                                     <a> Accept </a>
                                     <a> Decline </a>
                             </ul>
                         </div>
                         
                         <div className = "notification-id">
                             <img src="/assets/users/jim_profile_img.jpg"/>
                             <ul>
                                 <li> Jim Mend invited you to play SwordIt  </li>
                                     <a> Accept </a>
                                     <a> Decline </a>
                             </ul>
                         </div>
                     </div>
                 </div>
            
        )
    }
}

export default Notificationdropdown;