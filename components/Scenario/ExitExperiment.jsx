import React from 'react';
import {Link} from 'react-router-dom'
import {registerEvent} from '../../utilities.js';

class ExitExperiment extends React.Component {
    
    constructor(){
     super();
    
     this.submitExperiment = this.submitExperiment.bind(this);
    }
    
    
    submitExperiment() {
        //alert('My Master has not told me what to do yet. But I guess this is the point where I move onto the post-experiment survey')
        
        registerEvent("Finished", "Exiting the prototype and heading to the Suvery", "Scenario Area");
        
        location.href='https://clemson.ca1.qualtrics.com/jfe/form/SV_4OYW85t2VedzdCR';
        
        
    }
    
    render() {
        return (
            
            <button className="finish-button"  onClick = {this.submitExperiment}>
                     <label className="list-text">EXIT</label>
            </button>
        
        )
    }
}

export default ExitExperiment;