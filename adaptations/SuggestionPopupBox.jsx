import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SuggestionPopup from './Suggestion.jsx'
import {SaveVisitedAdaptation, nameToLink} from '../utilities.js'


class SuggestionPopupBox extends Component {
    

    
    render() {
        return(
          <SuggestionPopup title="Suggestion" okay={this.props.okay} routeTo={this.props.routeTo} destroy={this.props.destroy}>
              {this.props.label}
              <br></br>
          </SuggestionPopup>
        )
    }
}

export default SuggestionPopupBox;