import React from 'react'
import ReactDOM from 'react-dom'

import Button from './Button.jsx'

// Largely from https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
class Menu extends React.Component {
  constructor() {
    super();
    
    this.state = {showMenu: false,
      overflow: false};
    this.showMenu = this.showMenu.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  showMenu(event) {
    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.onClick);
    });
  }

  onClick(e) {
    // Pass checkContains to keep the menu open if a click occurs within the menu options
    if (!this.props.checkContains || !this.dropdownMenu.contains(e.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.onClick);
      });
    }
  }

  render () {
    {/* Icon prop is one of: {vert, horiz, gear, current}, vert is default */}
    let button = null;
    if (this.props.icon == "current") {
      // this.props.current is a callback function which tells the menu what the currently selection option is
      button = <Button type="cancel" onClick={this.showMenu} id="current-button">{this.props.current()}</Button>
    }
    else {
      button = (
          <Button onClick={this.showMenu}>
            <span className={"menu-icon"  + ' ' + (this.props.icon ? this.props.icon : "vert")}></span>
          </Button>
        );
    }
    return (
      <div className="menu">
        {
          (this.state.showMenu && this.props.upwards) ?
          (
            <div className="dropdown-menu" ref={(element) => {this.dropdownMenu = element}}>
              {this.props.children}
            </div>
          ) : (null)
        }

        {button}

        {
          (this.state.showMenu && !this.props.upwards) ?
          (
            <div className="dropdown-menu" ref={(element) => {this.dropdownMenu = element}}>
              {this.props.children}
            </div>
          ) : (null)
        }
      </div>
    );
  }
}

export default Menu;