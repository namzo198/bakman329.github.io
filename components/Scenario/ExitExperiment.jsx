import React from 'react';
import {Link} from 'react-router-dom'
import {registerEvent, getSession} from '../../utilities.js';

import Popup from '../Popup.jsx'
import CompletionPopup from './CompletionPopup.jsx'
import {getParsed, longFeatureTitle} from '../../utilities.js';

class ExitExperiment extends React.Component {
    constructor(){
        super();

        this.state = {renderCompletionPopup: false}

        this.submitExperiment = this.submitExperiment.bind(this);
    }

    submitExperiment() {
        this.setState({renderCompletionPopup: true});
    }

    render() {


        let completionPopup = <CompletionPopup
            destroy={() => {this.setState({renderCompletionPopup: false})}} />

        return (
            <div>
            {this.state.renderCompletionPopup ? completionPopup : null}
            <button className="finish-button"  onClick = {this.submitExperiment}>
                     <label className="list-text">EXIT</label>
            </button>
            </div>
        )
    }
}

export default ExitExperiment;


        
