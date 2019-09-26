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
        this.props.destroy();   
    }
    
    okay(){
         var event={
                    action: ` Suggestion: ${this.props.context}, Check to see if they actually input the requested information`,
                    context: "1",
                    object: `Adapted information for ${this.props.context}`, 
                  };
                  this.visited(this.props.context,"suggestion");
                  return event;
       }
    
    
    destroy(){
                    //TODO Should just adjust the suggestion lifeCycle. 
        var event={
                    action:`Decline_Suggestion: ${this.props.context}`,
                    context: "0",
                    object:`Adapted information for ${this.props.context}`,
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
            
        )
    }
}

export default ContactInfoSuggestion;