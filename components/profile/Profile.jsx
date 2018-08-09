import React from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {linkToName} from '../../utilities.js'

import Timeline from "./Timeline.jsx"
import About from "./settings/About.jsx"

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-container">
        <div id="profile-content">
          <div className="top_container">
            <div className="cover_photo"></div>
            <div className = "top_options">
              <ul className = "nav_top_options">
                <li><Link to={"/profile/" + this.props.match.params.user}>Timeline</Link></li>
                <li><Link to={"/profile/" + this.props.match.params.user + "/about/overview"}>About</Link></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">Photos</a></li>
                <li><a href="#">More</a></li>
              </ul>
            </div>

            <div className = "profile_photo">
              <img src ='/assets/profile_img.jpg'/>
            </div>
            <h2>{linkToName(this.props.match.params.user)}</h2>
          </div>

          <Switch>
            <Route path='/profile/:user/about/:section' component={About} />
            <Route path='/profile/:user' component={Timeline} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Profile;