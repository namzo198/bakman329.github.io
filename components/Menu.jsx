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
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    // event.preventDefault();
    
    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    // Pass checkContains to keep the menu open if a click occurs within the menu options
    if (!this.props.checkContains || !this.dropdownMenu.contains(event.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  render () {
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

        <Button href='javascript:void(0)' onClick={this.showMenu}>
          {/* Icon prop is one of: {vert, horiz, gear}, vert is default*/}
          <span className={"menu-icon"  + ' ' + (this.props.icon ? this.props.icon : "vert")}></span>
        </Button>

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