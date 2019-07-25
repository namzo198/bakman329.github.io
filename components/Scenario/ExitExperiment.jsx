import React from 'react';

class ExitExperiment extends React.Component {
    
    constructor(){
     super();
    
     this.submitExperiment = this.submitExperiment.bind(this);
    }
    
    
    submitExperiment() {
        alert('My Master has not told me what to do yet. But I guess this is the point where I move onto the post-experiment survey')
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