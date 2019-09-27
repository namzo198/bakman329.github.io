import React from 'react';
import {Link} from 'react-router-dom'
import {registerEvent} from '../../utilities.js';

import Popup from '../Popup.jsx'
import {getParsed, longFeatureTitle, getSession} from '../../utilities.js';

class CompletionPopup extends React.Component {
    constructor(){
        super();

        this.state = {featuresVisited: {},
                      featuresUsed: {}}

        this.USAGE_WEIGHT = 3;
        this.MIN_SCORE_TO_PROCEED = 15;

        this.score = this.score.bind(this);
        this.submitExperiment = this.submitExperiment.bind(this);
        this.unusedList = this.unusedList.bind(this);
    }

    score(featuresUsed, featuresVisited) {
        let sc = 0;
        for (let feat in featuresUsed) {
            sc += this.USAGE_WEIGHT * Object.keys(featuresUsed[feat]).some((a) => {return featuresUsed[feat][a]});
        }
        for (let feat in featuresVisited) {
            sc += Object.keys(featuresVisited[feat]).some((a) => {return featuresVisited[feat][a]});
        }
        return sc;
    }

    submitExperiment() {
        /* this.setState({featuresVisited: getParsed("featuresVisited"),
                       featuresUsed: getParsed("featuresUsed")},
            () => {
                let sc = this.score();

                if (sc < this.MIN_SCORE_TO_PROCEED) {
                    this.setState({renderCompletionPopup: true});
                }
                else {
                    location.href='https://clemson.ca1.qualtrics.com/jfe/form/SV_4OYW85t2VedzdCR';
                }
            }); */
            let sc = this.score(getParsed("featuresUsed"), getParsed("featuresVisited"));
            if (sc < this.MIN_SCORE_TO_PROCEED) {
                registerEvent("Tracker_Completion Popup", `Held by the tracker with score ${sc}`, "Scenario Area");
                return;
            }
            else {
                if (this.props.logout) {
                    registerEvent("Finished", "Exiting the prototype and heading to the Suvery", "Logout_Settings Dropdown");
                }
                else {
                    registerEvent("Finished Experiment", "Exiting the prototype -> the Suvery", "Scenario Area");
                }
                // location.href='https://clemson.ca1.qualtrics.com/jfe/form/SV_4OYW85t2VedzdCR';
                let session_id = getSession();
                location.href= `https://fakebook.usabart.nl/survey/?session=${session_id}&from=experiment`
            }
    }

    unusedList() {
        let used = getParsed("featuresUsed");
        let visited = getParsed("featuresVisited");
        let unusedNames = []
        for (let feat in used) {
            if (!Object.keys(used[feat]).some((a) => {return used[feat][a]})) {
                unusedNames.push(longFeatureTitle(feat));
            }
        }

        return unusedNames.map((s, i) => {return <li key={i} style={{marginBottom:"5px",
    lineHeight:"1.5"}}>{s}</li>});
    }
    render() {
        this.submitExperiment();
        return (
            <Popup title="Some features not visited" warningHeader closeButton closeButtonName="Close"
                cancel={this.props.destroy}>
            <h4>You should try some of these things before moving on:</h4>
            <ul id="unused-list">
                {this.unusedList()}
            </ul>
            </Popup>
        );
    }
}

export default CompletionPopup;
