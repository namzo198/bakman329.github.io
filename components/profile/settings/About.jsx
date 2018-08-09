import React from 'react'
import {Link} from 'react-router-dom'

import ContactInfo from './ContactInfo.jsx';
import Overview from './Overview.jsx'

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: '', displaycontactinfo:false};
   
    this.overview = this.overview.bind(this);
    this.getSection = this.getSection.bind(this);
  }

  overview() {
    return(
        <ul id="info_left">
          <li id="selector"><Link to={'/profile/' + this.props.match.params.user + '/about/overview'}>Overview</Link></li>
          <li><a href="javascript:void(0)">Work and education</a></li>
          <li><a href="javascript:void(0)">Places you've lived</a></li>
          <li><Link to={'/profile/' + this.props.match.params.user + '/about/contact'}>Contact and basic info</Link></li>
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
        return <ContactInfo />;
      default:
        return <Overview />;
    }
  }
  
  render() {
    return (
        <div id="info_wrapper">
          <div className="title">
            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/IKrON1RLHfZ.png'/>
            <a href ="#">About</a>
          </div>
          {this.overview()}
          {this.getSection()}
        </div>
    );
  }
}

export default About;