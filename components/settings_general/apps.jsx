import React,{Component} from 'react';


class Apps extends Component {

render() {
  return (
    <div className="right">
      <div className = "right_header_1"> Preferences </div>
      <div className ="blocks">
        <div className ="block_1">

         <div className="block1_icon"> <div className ="block_header">  Game and app notifications </div> </div>
        <div className ="block_content"> This setting controls game requests from friends and game status updates,
           and app notifications from app developers on Facebook and Gameroom.
            Changing this setting will not affect your ability to use apps or play games.
          </div>
          <div>
          <div className = "toggle">  Notifications are turned off   </div>

          <input id="button" type="submit" value="Edit" />

        </div>

        </div>
      </div>
     </div>
  );
 }
}

export default Apps;