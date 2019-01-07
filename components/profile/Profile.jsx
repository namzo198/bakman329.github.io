import React from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {linkToName,getParsed,addToLocalStorageObject} from '../../utilities.js'
import {highLight,noHighLight} from '../../adaptations/Highlight.js';

import Timeline from "./Timeline.jsx"
import About from "./settings/About.jsx"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    let adaptation = getParsed("adaptations")
    let adaptationVisited = getParsed("visited");
    
    this.state = {
        adaptation:adaptation,
        adaptationVisited:adaptationVisited,
        highlight: !adaptationVisited["ContactInfo"]["highlight"]&& (adaptation["contactInfo"] === "high")?highLight:noHighLight,
        displayContactInfoSuggestion: !adaptationVisited["ContactInfo"]["suggestion"]&& (adaptation["contactInfo"] === "sugst")
      }
      
      this.changeStyle = this.changeStyle.bind(this);
  }
    
   componentWillReceiveProps(nextProps){
       if(this.state.displayContactInfoSuggestion !== (this.state.adaptationVisited["ContactInfo"]["suggestion"]&&this.state.adaptation["contactInfo"] === "sugst")){
           
           this.setState({
               displayContactInfoSuggestion: this.state.adaptationVisited["ContactInfo"]["suggestion"]
           })
           
           //console.log("The visited state of suggestion in components will receive props" + this.state.displayContactInfoSuggestion)
       }
   }
    changeStyle(){
        if(!this.state.adaptationVisited["ContactInfo"]['highlight']){
            this.setState({
             highlight:noHighLight
            })
            
            //for final submission
            //this.state.adaptationVisited["ContactInfo"]['suggestion'] = true;
            //this.state.adaptationVisited["ContactInfo"]['highlight'] = true;
            //this.state.adaptationVisited["ContactInfo"]['automation'] = true;
            //addLocalStorageObject("visited",this.state.adaptationVisited);
            
        }
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
                <li style={this.state.highlight}><Link to={"/profile/" + this.props.match.params.user + "/about/overview"} onClick={this.changeStyle}>About</Link></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">Photos</a></li>
                <li><a href="#">More</a></li>
              </ul>
            </div>

              {/*console.log('The use name is'+ this.props.match.params.user.split("_")[0])*/}
              {/*console.log("The suggestion state is "+ this.state.displayContactInfoSuggestion)*/}
              
            <div className = "profile_photo">
              <img src ={'/assets/users/'+this.props.match.params.user.split("_")[0]+'_profile_img.jpg'}/>
            </div>
            <h2>{linkToName(this.props.match.params.user)}</h2>
          </div>
          <Switch>
            <Route path='/profile/:user/about/:section' component={About} />
            <Route path='/profile/:user' render={(props) => <Timeline {...props}  displayContactInfoSuggestion ={this.state.displayContactInfoSuggestion} />}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Profile;