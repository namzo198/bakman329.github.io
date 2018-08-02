import React from 'react'
import {Link} from 'react-router-dom'

import Contact from './Contact.jsx';
import Overview from './Overview.jsx'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: '', displaycontactinfo:false};
   
    this.overview = this.overview.bind(this);
    this.getSection = this.getSection.bind(this);
  }

  overview() {
    return(
        <ul id="info_left">
          <li id="selector"><Link to='/settings/overview'>Overview</Link></li>
          <li><a href="javascript:void(0)">Work and education</a></li>
          <li><a href="javascript:void(0)">Places you've lived</a></li>
          <li><Link to='/settings/contact'>Contact and basic info</Link></li>
          <li><a href="javascript:void(0)">Details about you</a></li>
          <li><a href="javascript:void(0)">Life events </a></li>
        </ul>
    );
  }

  getSection() {
    switch(this.props.match.params.section) {
      case "overview":
        return <Overview />;
      case "contact":
        return <Contact />;
      default:
        return <Overview />;
    }
  }
  
  render() {
    console.log(this.state);
    console.log(this.props);
    // TODO: Create generic user profile page, and make this a routed child of that
    return (
      <div id="page-container">
        <div className="top_container">
          <div className="cover_photo"></div>
          <div className = "top_options">
            <ul className = "nav_top_options">
              <li><a href="#">Timeline</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href="#">Photos</a></li>
              <li><a href="#">More</a></li>
            </ul>
          </div>

          <div className = "profile_photo">
            <img src ='/assets/profile_img.jpg'/>
          </div>
        </div>

        <div id="info_wrapper">
          <div className="title">
            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/IKrON1RLHfZ.png'/>
            <a href ="#">About</a>
          </div>
          {this.overview()}
          {this.getSection()}
        </div>
      </div>
    );
  }
}

export default BasicInfo;