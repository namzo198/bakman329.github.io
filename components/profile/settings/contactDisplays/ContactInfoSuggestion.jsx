import React, {Component} from 'react'
import ReactDOM from 'react-dom';
//import SuggestionPopup  from '../../../../adaptations/Suggestion.jsx'
import SuggestionPopupBox from '../../../../adaptations/SuggestionPopupBox.jsx'
import {saveVisitedAdaptation,nameToLink} from '../../../../utilities.js'


class ContactInfoSuggestion extends Component {
   
    //I have to give it a time when it can show.
    constructor(props){
        super(props);
        
        this.okay = this.okay.bind(this);
        this.destroy = this.destroy.bind(this);
        this.label = this.label.bind(this);
        this.visited = this.visited.bind(this);
    }
    
    visited(feature,name){
        saveVisitedAdaptation(feature,name)
        //let adaptationVisited = getParsed("visited");
        //adaptationVisited ["ContactInfo"]["suggestion"] = true
        //addToLocalStorageObject("visited",adaptationVisited) 
        this.props.destroy();   
    }
    
    okay(){
         var event={
                    action: ` Followed and agreed with Suggestion for ${this.props.context}, Check to see if they actually input the requested information`,
                    context: this.props.context,
                    name: this.props.username, 
                  };
                  this.visited(this.props.context,"suggestion");
                  return event;
       }
    
    
    destroy(){
                    //TODO Should just adjust the suggestion lifeCycle. 
        var event={
                    action:`Rather Not/Declined to follow the Suggestion for ${this.props.context}`,
                    context: this.props.context,
                    name: this.props.username,
                };
                  this.visited(this.props.context,"suggestion");
                  return event;
    }
    
    label(){
         return (
            <label>
                {this.props.label} 
            </label> 
        )
    }

    
    render() {
        
        return(
            
            <SuggestionPopupBox okay={this.okay} destroy={this.destroy} routeTo={"/profile/" +nameToLink(this.props.username) + "/about/contact"}  label = {this.label()}/>
            
              /**<SuggestionPopup title="Suggestion" okay={()=>{
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
              </SuggestionPopup>*/
        )
    }
}

export default ContactInfoSuggestion;