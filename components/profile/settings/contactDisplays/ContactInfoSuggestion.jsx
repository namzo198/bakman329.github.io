import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Button from '../../../Button.jsx'
import ContactInfo from '../ContactInfo.jsx';
import About from '../About.jsx'
import SuggestionPopup  from '../../../../adaptations/Suggestion.jsx'
import {saveVisitedAdaptation,nameToLink} from '../../../../utilities.js'


class ContactInfoSuggestion extends Component {
    
    //I have to give it a time when it can show.
    
    visited(feature,name){
        saveVisitedAdaptation(feature,name)
        //let adaptationVisited = getParsed("visited");
        //adaptationVisited ["ContactInfo"]["suggestion"] = true
        //addToLocalStorageObject("visited",adaptationVisited) 
        this.props.destroy();   
    }
    
    render() {
        
        return(
            
              <SuggestionPopup title="Suggestion" okay={()=>{
                var event={
                    action: ' Followed and agreed with Suggestion for ContactInfo, Check to see if they actually input the requested information',
                    context: "ContactInfo",
                    name: this.props.username, 
                  };
                  this.visited("ContactInfo","suggestion");
                  return event;
                }}
                
                routeTo ={"/profile/" +nameToLink(this.props.username) + "/about/contact"}
                
                destroy={()=>{
                    //TODO Should just adjust the suggestion lifeCycle. 
                  var event={
                    action:'Rather Not/Declined to follow the Suggestion for ContactInfo',
                    context: "ContactInfo",
                    name: this.props.username,
                  };
                  this.visited("ContactInfo","suggestion");
                  return event;
                }}>


                <label>
                    Hi {this.props.username.split(" ")[0]} - I think you should add your <strong>Address</strong> information in the <strong>Contact Information</strong> section <a href="https://www.facebook.com/help/1017657581651994/?helpref=hc_fnav"> Learn More</a> 
                </label>
                <br></br>
                
                
                
              </SuggestionPopup>
        )
    }
}

export default ContactInfoSuggestion;