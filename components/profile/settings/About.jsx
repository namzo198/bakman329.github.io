import React from 'react'
import {Link} from 'react-router-dom'
import {linkToName,getParsed,addToLocalStorageObject} from '../../../utilities.js'
import {highLight,noHighLight} from '../../../adaptations/Highlight.js';

import ContactInfo from './ContactInfo.jsx';
import Overview from './Overview.jsx'

class About extends React.Component {
  constructor(props) {
    super(props);
    
    let adaptation = getParsed("adaptations")
    let adaptationVisited = getParsed("visited");
    
    
    this.state = {
         adaptationVisited:adaptationVisited,
        highlight: !adaptationVisited["ContactInfo"]["highlight"]&& (adaptation["contactInfo"] === "high")?highLight:noHighLight,
    };
   
    this.overview = this.overview.bind(this);
    this.getSection = this.getSection.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

    changeStyle(){
        if(!this.state.adaptationVisited["ContactInfo"]['highlight']){
            this.setState({
             highlight:noHighLight
            })    
        }
    }
  overview() {
    return(
        <ul id="info_left">
          <li id="selector"><Link to={'/profile/' + this.props.match.params.user + '/about/overview'}>Overview</Link></li>
          <li><a href="javascript:void(0)">Work and education</a></li>
          <li><a href="javascript:void(0)">Places you've lived</a></li>
          <li style={this.state.highlight}><Link to={'/profile/' + this.props.match.params.user + '/about/contact'} onClick = {this.changeStyle}>Contact and basic info</Link></li>
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
            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/dp8LigpKyOw.png'/>
            <a href ="#">About</a>
          </div>
          {this.overview()}
          {this.getSection()}
        </div>
    );
  }
}

export default About;