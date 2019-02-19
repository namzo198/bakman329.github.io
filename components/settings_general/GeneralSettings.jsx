import React from 'react'
import {Link} from 'react-router-dom'
import Blocking from './blocking.jsx'
import Apps from './apps_and_websites.jsx'
import TimelineandTagging from './timeline_and_tagging.jsx'
import Privacy from './privacy.jsx'
import General from './general.jsx'
import {getParsed} from '../../utilities.js'
import {highLightExtended,noHighLight} from '../../adaptations/Highlight.js'


class GeneralSettings extends React.Component{
    constructor(props) {
        super(props)
        
        let adaptation = getParsed("adaptations")
        let adaptationVisited = getParsed("visited");
        
        this.state = {
         adaptationVisited:adaptationVisited,
        highlightPrivacy: !adaptationVisited["Privacy_futureRequests"]["highlight"]&& (adaptation["privacy_futureRequests"] === "high")?highLightExtended:noHighLight,
        };
        
        this.sidemenu = this.sidemenu.bind(this);
        this.getSelection = this.getSelection.bind(this);
        this.changeStyle = this.changeStyle.bind(this);
        
    }
    
    changeStyle(){
        if(!this.state.adaptationVisited["Privacy_futureRequests"]['highlight']){
            this.setState({
             highlightPrivacy:noHighLight
            })    
        }
    }
    
    sidemenu(){
        return (
            <div>
                <div className="wrapper_left">
                    <div className="options_left">
                     
                        <div className = "imgwrap_1"> 
                            <div className ="link" > 
                                <li> <Link to="/settings_general/general"> General </Link> </li> 
                             </div> 
                          </div> 
                           <br/>
                       <div style={this.state.highlightPrivacy}>
                        <div className = "imgwrap_2"> 
                            <div className ="link" > 
                                <li > <Link to="/settings_general/privacy" onClick = {this.changeStyle}> Privacy </Link> </li> 
                             </div> 
                          </div> 
                          </div>
                           <br/>
                           
                            <div className = "imgwrap_3"> 
                                    <div className ="link" >
                                         <li><Link to="/settings_general/timeline_and_tagging"> Timeline and Tagging </Link></li> 
                                    </div>
                                </div> 
                              <br/>
                              
                            <div className = "imgwrap_4">  
                              <div className ="link" > 
                                  <li> <Link to="/settings_general/blocking"> Blocking </Link> </li> 
                               </div>    
                            </div> 
                            <br/>

                            <div className = "imgwrap_5">  
                                <div className ="link" > 
                                    <li> <Link to="/settings_general/apps"> Apps and websites </Link></li> 
                                 </div>
                              </div> 
                               <br/>
                               
                           </div>
                        </div>
                    </div>
        )
    }
    
    getSelection() {
        switch(this.props.match.params.section){
            case "general":
                return <General />
            case "privacy":
                return < Privacy />;
            case "timeline_and_tagging":
                return <TimelineandTagging/>;
            case "blocking":
               return <Blocking />;
            case "apps":
                return <Apps/>
            default:
                return <General />; 
        }
    }
    
    render() {
        return (
           <div id="container">
               {this.sidemenu()}
               <div className="divider"></div>
               {this.getSelection()}
           </div>
        )
    }
    
}

export default GeneralSettings;