import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {Link} from 'react-router-dom';
import Menu from '../Menu.jsx'



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
        /*style="
    display: inline-block;
    margin-left: 60px;
"*/
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
                             
                                 <p> Kyle Parker invited you to Rave Night </p>  
                                    <div style={{display:"inline-block", marginLeft:"60px"}}>
                                        <Menu icon={'horiz'}>
                                         <Button>
                                             Block
                                         </Button>
                                       </Menu>
                                  </div>  
                         </div>
                         
                          <div className = "notification-id">
                             <img src="/assets/users/jack_profile_img.jpg"/>
                             <ul>
                                 <li> Jack Scout mentioned you in a comment</li>
                                  
                             </ul>
                         </div>
                        
                         <div className = "notification-id">
                             <img src="/assets/users/jim_profile_img.jpg"/>
                             
                                 <p> Jim Mend invited you to play CandyOut </p>
                                   <div style={{display:"inline-block", marginLeft:"60px"}}>
                                        <Menu icon={'horiz'}>
                                         <Button>
                                             Block
                                         </Button>
                                       </Menu>
                                  </div> 
                         </div>                  
                       
                         
                         <div className = "notification-id">
                             <img src="/assets/users/lydia_profile_img.jpg"/>
                             <ul>
                               <li>  Lydia Chopover likes your post </li>                    
                            </ul>
                         </div>
            
                        
                          <div className = "notification-id">
                             <img src="/assets/users/kyle_profile_img.jpg"/>
                            <p> Kyle Parker invited you to TwerkOut </p>
                                <div style={{display:"inline-block", marginLeft:"60px"}}>
                                        <Menu icon={'horiz'}>
                                         <Button>
                                             Block
                                         </Button>
                                       </Menu>
                                  </div>   
                         </div>
                         
                        <div className = "notification-id">
                             <img src="/assets/users/tanya_profile_img.jpg"/>
                               <ul>
                                  <li> Tanya Strotman likes your photo </li>
                               </ul>
                         </div>
                         
                         
                         <div className = "notification-id">
                             <img src="/assets/users/jim_profile_img.jpg"/>
                              <p> Jim Mend invited you to play SwordIt  </p>
                                <div style={{display:"inline-block", marginLeft:"60px"}}>
                                        <Menu icon={'horiz'}>
                                         <Button>
                                             Block
                                         </Button>
                                       </Menu>
                                  </div> 
                         </div>
                     </div>
                 </div>
            
        )
    }
}

export default Notificationdropdown;