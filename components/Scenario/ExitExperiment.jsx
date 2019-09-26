import React from 'react';
import {Link} from 'react-router-dom'
import {registerEvent, getSession} from '../../utilities.js';

import Popup from '../Popup.jsx'
import {getParsed, longFeatureTitle} from '../../utilities.js';

class ExitExperiment extends React.Component {
    constructor(){
        super();

        this.USAGE_WEIGHT = 3;
        this.MIN_SCORE_TO_PROCEED = 15;

        this.state = {renderCompletionPopup: false,
                      featuresVisited: {},
                      featuresUsed: {}}
        this.score = this.score.bind(this);
        this.submitExperiment = this.submitExperiment.bind(this);
        this.unusedList = this.unusedList.bind(this);
    }

    score() {
        let sc = 0;
        for (let feat in this.state.featuresUsed) {
            sc += this.USAGE_WEIGHT * Object.keys(this.state.featuresUsed[feat]).some((a) => {return this.state.featuresUsed[feat][a]});
        }
        for (let feat in this.state.featuresVisited) {
            sc += Object.keys(this.state.featuresVisited[feat]).some((a) => {return this.state.featuresVisited[feat][a]});
        }
        return sc;
    }

    submitExperiment() {
       
        this.setState({featuresVisited: getParsed("featuresVisited"),
                       featuresUsed: getParsed("featuresUsed")},
            () => {
                let sc = this.score();

                if (sc < this.MIN_SCORE_TO_PROCEED) {
                    this.setState({renderCompletionPopup: true});
                  registerEvent("Tracker_Completion Popup", `Held by the tracker with score ${sc}`, "Scenario Area");
                }
                else {
                    //location.href='https://clemson.ca1.qualtrics.com/jfe/form/SV_4OYW85t2VedzdCR';
                   registerEvent("Finished Experiment", "Exiting the prototype -> the Suvery", "Scenario Area");
                   let session_id = getSession();
                   location.href= `https://fakebook.usabart.nl/survey/?session=${session_id}&from=experiment`
                  
                 
                }
            });
            

           
    }

    unusedList() {
        let unusedNames = []
        for (let feat in this.state.featuresUsed) {
            if (!Object.keys(this.state.featuresUsed[feat]).some((a) => {return this.state.featuresUsed[feat][a]})) {
                unusedNames.push(longFeatureTitle(feat));
            }
        }

        return unusedNames.map((s, i) => {return <li key={i} style={{marginBottom:'5px', lineHeight:'1.5'}}>{s}</li>});
    }

    render() {
        let completionPopup =
            <Popup title="Some features not visited"  warningHeader closeButton closeButtonName="Close"
                cancel={() => {this.setState({renderCompletionPopup: false})}}>
            <h2>You should try some of these things before moving on:</h2>
            <ul id="unused-list">
                {this.unusedList()}
            </ul>
            </Popup>

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


        