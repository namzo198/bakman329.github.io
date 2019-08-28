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
            action: `Followed and agreed with the Suggestion for ${this.props.action}`,
            context: this.props.context,
            name: 'Suggestion Adaptation'
        };
        
        this.props.agree();
        this.visited(this.props.context, "suggestion");
        return event;
    }
    
    destroy(origin){
    
        var event = {
            action: origin+` the Suggestion for ${this.props.context}`,
            context:this.props.context,
            name:'Suggestion Adaptation'
        };
        
        this.visited(this.props.context, "suggestion");
        //return event;
         CreateEvent(event);
    }
    
   /** dismissed(e){

        console.log("I am being pressed")
        e.preventDefault();
        
        
        var event = {
            action:`Dismissed the Suggestion for ${this.props.context}`,
            context:this.props.context,
            name:'Alex_doe'
        };
        
       
        this.visited(this.props.context, "suggestion");
    }*/
    
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