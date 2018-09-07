import React from 'react'
import ReactDOM from 'react-dom'
import {audienceText} from '../utilities.js'

import Button from './Button.jsx'
import Menu from './Menu.jsx'

class AudienceMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {audience: 'public', more: false, see_all: false};

    this.setAudience = this.setAudience.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }


  setAudience(audience) {
    this.props.onChange(audience);
    this.setState({audience: audience});
  }

  getText(option) {
    switch (option) {
      case "public":
        return ["Public", "Anyone on or off Facebook"];

      case "friends":
        return ["Friends", "Your friends on Facebook"];

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
      if (option == "more") {
        if (this.state.more) {
          return;
        }

        buttons.push(
          <Button onClick={() => {this.setState({more: true})}} key={i}>
            {text[0]}
          </Button>
        );
        i++;
      } else if (option == "see_all") {
        if (this.state.see_all) {
          return;
        }

        buttons.push(
          <Button onClick={() => {this.setState({see_all: true})}} key={i}>
            {text[0]}
          </Button>
        );
        i++;
      }
      else if (option == "custom") {
        buttons.push(
          <Button onClick={() => {this.setAudience(option)}} key={i}>
            {text[0]}
            <p id="audience-subtitle">{text[1]}</p>
          </Button>
        );
        i++;
      } else {
        buttons.push(
          <Button onClick={() => {this.setAudience(option)}} key={i}>
            {text[0]}
            <p id="audience-subtitle">{text[1]}</p>
          </Button>
        );
        i++;
      }
    });

    return buttons;
  }

  render() {
    let title = (this.props.title) ? <p>{this.props.title}</p> : "";
    let subtitle = (this.props.subtitle) ? <p id="audience-header-subtitle">{this.props.subtitle}</p> : "";
    return (
      <span className="audience-menu">
      <Menu icon="current" current={() => {return audienceText(this.state.audience) + " ▼"}}>
        {title}
        {subtitle}
        {this.generateButtons()}
      </Menu>
      </span>
    );
  }
}

export default AudienceMenu;