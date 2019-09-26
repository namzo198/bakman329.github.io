//destroy 

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SuggestionPopupBox from '../SuggestionPopupBox.jsx'
import {saveVisitedAdaptation} from '../../utilities.js'
import {CreateEvent} from '../../controller/databaseFunctions.js';


class SuggestionBoilerplate extends Component{
    constructor(props){
        super(props);
        
        this.okay = this.okay.bind(this);
        this.destroy = this.destroy.bind(this);
        this.label = this.label.bind(this);
        this.visited = this.visited.bind(this);
        //this.dismissed = this.dismissed.bind(this);
    }
    visited(feature,name){
        saveVisitedAdaptation(feature,name)
        this.props.destroy();
    }
    
    okay(){
        var event={
            action: `Suggestion: ${this.props.context}`,
            context: "1",
            object: this.props.action
        };
        
        this.props.agree();
        this.visited(this.props.context, "suggestion");
        return event;
    }
    
    destroy(origin){
    
        var event = {
            action: `Decline_Suggestion: ${this.props.context}`,
            context:"0",
            object:this.props.action
        };
        
        this.visited(this.props.context, "suggestion");
        return event;
       
    }
    
    
    label(){
        return(
            <label>
                {this.props.label}
            </label>
        )
    }
    
    
    render(){
        return(
            <SuggestionPopupBox okay={this.okay} destroy={this.destroy}  routeTo= {this.props.routeTo != undefined?this.props.routeTo:null} label = {this.label()} />
        )
    }

}
export default SuggestionBoilerplate;