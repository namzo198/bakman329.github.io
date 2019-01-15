import React from 'react'
import {getProfilePic} from '../utilities.js'

import Popup from './Popup.jsx'
import FriendSelectorUser from './FriendSelectorUser.jsx'
import Button from './Button.jsx'

// If the "except" prop is given, renders the "friends except" dialogue, else just the specific friend dialogue
class FriendSelector extends React.Component {
  constructor(props) {
    super(props);

    let enabled = {};
    JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
      if (!user.friend) {
        return;
      }
      var settings = JSON.parse(localStorage.getItem('settings'));
      
      var audience_settings = settings["post_audience_settings"][(this.props.except) ? 1 : 2];

      enabled[user.name] = (audience_settings.indexOf(user.name) >= 0);
    });
    this.state = {enabled: enabled};
  }

  render() {
    var friends = [];
    JSON.parse(localStorage.getItem('users')).forEach((user, index, array) => {
      if (!user.friend) {
        return;
      }
      
      var name = user.name;
      friends.push(
        <FriendSelectorUser name={name} key={index} except={this.props.except} enabled={this.state.enabled[name]}
          onClick={(name) => {
            let en = this.state.enabled;
            en[name] = !en[name];
            this.setState({enabled: en});
          }} />
      );
    });

    return (
      <Popup saveChanges title={(this.props.except) ? "Friends Except..." : "Specific Friends"}
            destroy={(cancel=false) => {
              this.props.destroy();
            }}
            okay={() => {
              var all_false = true;
              for (var key in this.state.enabled) {
                if (this.state.enabled[key]) {
                  all_false = false;
                  break;
                }
              }
              this.props.okay(all_false);

              var settings = JSON.parse(localStorage.getItem('settings'));
              
              // Select either specific friends settings or except settings
              var audience_settings = settings["post_audience_settings"][(this.props.except) ? 1 : 2];
              
              // If a person was toggled off and was previously activated, remove them
              // Else if a person was toggled on and was previously unactivated, add them
              Object.keys(this.state.enabled).forEach((name) => {
                if (!this.state.enabled[name] && audience_settings.indexOf(name) >= 0) {
                  audience_settings.splice(audience_settings.indexOf(name), 1);
                } else if (this.state.enabled[name] && audience_settings.indexOf(name) < 0) {
                  audience_settings.push(name);
                }
              });

              settings["post_audience_settings"][(this.props.except) ? 1 : 2] = audience_settings;
              localStorage.setItem('settings', JSON.stringify(settings));
            }}
            cancel={() => {return;}}
            noPadding grayHeader dismissButton>
        <p id="friend-selector-friends-text">Friends</p>
        {friends}
      </Popup>
    );
  }
}

export default FriendSelector;