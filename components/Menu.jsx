import React from 'react'
import ReactDOM from 'react-dom'

import Button from './Button.jsx'
import {highLight,highLightExtended,No_highLight } from '../adaptations/Highlight.js'
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
    //if(this.myRef) {
    this.setState({showMenu: true}
              , () => {
    document.addEventListener('click', this.onClick);}
    );


    /*This style is for defining the highlight ..see example from NewPostArea*/
    if(this.props.style != undefined){
     this.props.changeStyle();
    }
    if (this.props.onOpen) this.props.onOpen();
    //}
  }
    
   
  onClick(e) {
    // Pass checkContains to keep the menu open if a click occurs within the menu options
    if (this.props.checkContains && e.target.closest(".dropdown-menu")) { // this.dropdownMenu.contains(e.target)) {
      return;
    }

    // Pass expandButtons with a list of element references to allow some buttons to be pressed without closing the list
    let exit = false;
    if (this.props.expandButtons) {
      this.props.expandButtons.forEach((button) => {
        if (button != null && button.contains(e.target)) {
          exit = true;
        }
      });
    }
    if (exit) return;

    this.setState({showMenu: false}, () => {
      document.removeEventListener('click', this.onClick);
      if (this.props.onClose) this.props.onClose();
    });
  }

  render () {
    {/* Icon prop is one of: {vert, horiz, gear, current}, vert is default */}
    let button = null;
    if (this.props.icon == "current") {
      // this.props.current is a callback function which tells the menu what the currently selection option is
      button = <Button type="cancel" onClick={this.showMenu} id="current-button" style={this.props.style}>{this.props.current()}</Button>
    }
    else {
      button = (
          <Button onClick={this.showMenu} >
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