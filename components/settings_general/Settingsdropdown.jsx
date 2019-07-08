import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {Link} from 'react-router-dom';



class Settingsdropdown extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        
        this.props.changeIcon();
        this.props.settingsdropDown();
    }
    
    render(){
        console.log("I have been called");
        return (  
            <div id = "dropdown_header"> 
                 <ul >
                     <li> <a className="settings_options_a" href="#">Create Page</a> </li>
                     <li> <a className="settings_options_a">Create Ads</a> </li>
                     <li> <a className="settings_options_a">Manage Ads</a> </li>
                     
                     <li><a className="settings_options_b" href="#Activity Logs">Activity Logs</a></li>
                      <li><a className="settings_options_b" href="#Setting">News Feed preferences</a></li>
                      <li><Link className="settings_options_b" to={{
                              pathname:'/settings_general/GeneralSettings',
                              state:{fromHeader:true}}} onClick={this.handleClick}>Settings</Link></li>
                     <li><a className="settings_options_b" href="#Log Out">Log Out</a></li>
               </ul>  
            </div>
        )
    }
}

export default Settingsdropdown;