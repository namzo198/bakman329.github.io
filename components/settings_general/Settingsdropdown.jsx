import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {Link} from 'react-router-dom';
import {getParsed,registerEvent,getSession} from '../../utilities.js';

import CompletionPopup from '../Scenario/CompletionPopup.jsx'

class Settingsdropdown extends React.Component {
    constructor(props){
        super(props);
        
        let adaptation = getParsed("adaptations")
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            highlight: !adaptationVisited["Privacy_futureRequests"]["highlight"]&&(adaptation["privacy_futureRequests"] == "high") || !adaptationVisited ["Timeline_seePost"]["highlight"]&& (adaptation["timeline_seePost"] === "high") || !adaptationVisited["Block_User"]["highlight"] && (adaptation["block_User"] == "high")||!adaptationVisited["Block_Event"]["highlight"] && (adaptation["block_Event"] == "high")||!adaptationVisited["Block_App"]["highlight"] && (adaptation["block_App"] == "high")||!adaptationVisited["Block_AppInvite"]["highlight"] && (adaptation["block_AppInvite"] == "high")? true: false,
            renderCompletionPopup: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleHighlight = this.handleHighlight.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
    }

    componentWillMount() {
        document.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
    }

    onClick(e) {
        // if (e.target.closest("#dropdown_header") || this.state.renderCompletionPopup) { // this.dropdownMenu.contains(e.target)) {
        if (this.state.renderCompletionPopup) { // this.dropdownMenu.contains(e.target)) {
          return;
        }
        this.props.destroy();
    }
    
    handleClick(){
    
        this.props.changeIcon();
        this.props.settingsdropDown();
        registerEvent("Clicked on the Settings button within the dropdown", "Transferred to the privacy settings page ");
    }
    
    
   handleHighlight(){  
        this.setState({
            highlight:false,
        })
    }
    
    registerEvent(){
        this.setState({renderCompletionPopup: true});
       // registerEvent("Finished", "Exiting the prototype and heading to the Suvery", "Logout_Settings Dropdown");
       //  
       //  let session_id = getSession();
        // location.href= `https://fakebook.usabart.nl/survey/?session=${session_id}&from=experiment`
                  
       //location.href='https://clemson.ca1.qualtrics.com/jfe/form/SV_4OYW85t2VedzdCR';  
    }
    
    render(){
        let completionPopup = <CompletionPopup
            destroy={() => {this.setState({renderCompletionPopup: false}); this.props.destroy()}}
            logout />
        return (  
            <span>
            {this.state.renderCompletionPopup ? completionPopup :
            <div id = "dropdown_header"> 
                 <ul >
                     <li> <a className="settings_options_a" href="javaScript:void(0)">Create Page</a> </li>
                     <li> <a className="settings_options_a">Create Ads</a> </li>
                     <li> <a className="settings_options_a">Manage Ads</a> </li>
                     
                     <li><a className="settings_options_b" href="javaScript:void(0)">Activity Logs</a></li>
                      <li><a className="settings_options_b" href="javaScript:void(0)">News Feed preferences</a></li>
                      <li className={this.state.highlight?"high1":null}><Link className="settings_options_a" to={{
                              pathname:'/settings_general/GeneralSettings',
                              state:{fromHeader:true}}} onClick={this.handleClick}>Settings</Link></li>
                     <li className="settings_options_a"><Button onClick={this.registerEvent}>Log Out</Button></li>
               </ul>  
            </div>}
            </span>
        )
    }
}

export default Settingsdropdown;
