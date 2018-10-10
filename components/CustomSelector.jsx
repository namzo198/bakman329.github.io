import React from 'react'
import {getProfilePic} from '../utilities.js'

import Popup from './Popup.jsx'
import AutocompleteInput from './AutocompleteInput.jsx'

class CustomSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popup saveChanges title="Custom Privacy"
        destroy={this.props.destroy}
        okay={() => {

        }}
        cancel={() => {return;}}
        noPadding grayHeader dismissButton>
        <div id="custom-popup-container">
          <div id="custom-popup-share-container">
            +
            <AutocompleteInput />
          </div>
          <div id="custom-popup-dont-container">
            X
            <AutocompleteInput />
          </div>
        </div>
      </Popup>
    );
  }
}

export default CustomSelector;