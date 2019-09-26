import React from 'react'
import ReactDOM from 'react-dom'
import {audienceText,saveVisitedAdaptation} from '../utilities.js'
import {CreateEvent} from '../controller/databaseFunctions.js';
import Button from './Button.jsx'
import Menu from './Menu.jsx'
import FriendSelector from './FriendSelector.jsx'
import CustomSelector from './CustomSelector.jsx'

class AudienceMenu extends React.Component {
  constructor(props) {
    super(props);

    var audience = JSON.parse(localStorage.getItem('settings'))["post_audience_settings"][0];

    this.state = {audience: audience, more: false, see_all: false,
      render_friends_except: false, render_specific_friends: false,
      render_custom: false};

    this.setAudience = this.setAudience.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
    this.unrenderPopups = this.unrenderPopups.bind(this);
  }


  setAudience(audience) {
    this.props.onChange(audience);
    this.setState({audience: audience});
    
    var settings = JSON.parse(localStorage.getItem('settings'));
    settings["post_audience_settings"][0] = audience;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getText(option) {
    switch (option) {
      case "public":
        return ["Public", "Anyone on or off FriendBook"];

      case "friends":
        return ["Friends", "Your friends on FriendBook"];

      case "friends_except":
        return ["Friends except...", "Friends; Except (list of friends)"];

      case "only_me":
        return ["Only me", "Only me"];

      case "more":
        return ["▼ More...", ""];

      case "specific_friends":
        return ["Specific friends", "Only show to some friends"];

      case "see_all":
        return ["▼ See All", ""];

      case "custom":
        return ["Custom", "Include and exclude friends and lists"];
      
      case "everyone":
        return ["Everyone",""];
     
      case "friends_of_friends":
        return ["Friends of friends",""];
            
      case "enabled":
        return ["Enabled",""];
     
      case "disabled":
        return ["Disabled",""];

      default:
        return [option, ""];
    }
  }

  generateButtons() {
    let buttons = [];

    let options = this.props.options;
    
    if (this.state.more) {
      options = options.concat(this.props.more);
    }

    if (this.state.see_all) {
      options = options.concat(this.props.see_all);
    }

    let i = 0;
    options.forEach((option) => {
      let text = this.getText(option);

      // If property "noSubtext" is given, just display the name of each option, not including a description
      let subtext = (this.props.noSubtext) ? "" : <p id="audience-subtitle">{text[1]}</p>;

      switch (option) {
        case "more":
          if (this.state.more) return;

          buttons.push(
            <span key={i} ref={(element) => {this.more_button = element}}>
            <Button onClick={() => {this.setState({more: true})}}>
              {text[0]}
            </Button>
            </span>
          );
          i++;
          break;

        case "see_all":
          if (this.state.see_all) return;

          buttons.push(
            <span key={i} ref={(element) => {this.see_all_button = element}}>
            <Button onClick={() => {this.setState({see_all: true})}}>
              {text[0]}
            </Button>
            </span>
          );
          i++;
          break;

        case "friends_except":
          buttons.push(
            <Button onClick={() => {this.setState({"render_friends_except": true})}} key={i}>
              {text[0]}
              {subtext}
            </Button>
          );
          i++;
          break;

        case "specific_friends":
          buttons.push(
            <Button onClick={() => {this.setState({"render_specific_friends": true})}} key={i}>
              {text[0]}
              {subtext}
            </Button>
          );
          i++;
          break;

        case "custom":
          buttons.push(
            <div  className={this.props.adapt?"high1":null} key={this.props.adapt}>
             <Button onClick={() => {this.setState({"render_custom": true})}} key={i}>
              {text[0]}
              {subtext}
            </Button>
            </div>
          );
          i++;
          break;

        default:
          buttons.push(
            <Button onClick={() => {this.setAudience(option)}} key={i} >
              {text[0]}
              {subtext}
            </Button>
          );
          i++;
          break;
      }
    });

    return buttons;
  }

  unrenderPopups() {
    this.setState({"render_friends_except": false, "render_specific_friends": false, "render_custom": false});
  }

  render() {
    let title = (this.props.title) ? <p>{this.props.title}</p> : "";
    let subtitle = (this.props.subtitle) ? <p id="audience-header-subtitle">{this.props.subtitle}</p> : null;

    let friends_except_popup = (
      <FriendSelector except okay={(empty) => {this.setAudience(empty ? "friends" : "friends_except")}} destroy={this.unrenderPopups} />
    );

    let specific_friends_popup = (
      <FriendSelector okay={(empty) => {this.setAudience(empty ? "only_me" : "specific_friends")}} destroy={this.unrenderPopups} />
    );

    let custom_popup = (
      <CustomSelector okay={(new_audience) => {this.setAudience(new_audience)}} destroy={this.unrenderPopups}  adapt={this.props.adapt} unHighlight={this.props.unHighlight}/>
    );

      
    return (
      <span className="audience-menu">
      {(this.state.render_friends_except) ? friends_except_popup : null}
      {(this.state.render_specific_friends) ? specific_friends_popup : null}
      {(this.state.render_custom) ? custom_popup : null}
      <Menu icon="current" current={() => {return audienceText(this.state.audience) + " ▼"}} onClose={() => {this.setState({more: false, see_all: false})}} expandButtons={[this.more_button, this.see_all_button]} style={this.props.highlight} changeStyle={this.props.removeHighlightOnClick}>
        {title}
        {subtitle}
        {this.generateButtons()}
      </Menu>
      </span>
    );
  }
}

export default AudienceMenu;