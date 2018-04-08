import React from 'react';
import ReactDOM from 'react-dom';

import Button from './Button.jsx'

class MenuButton extends Button {
   constructor(props) {
      super(props);
   }

   onClick() {
      super.onClick();
      // TODO: Buttons in menus should unshow their parent menu when pressed
      // this.props.menu.unshow();
   }
}

export default MenuButton;