import React from 'react';
import ReactDOM from 'react-dom';

import Button from './Button.jsx'

class Popup extends React.Component {
   constructor(props) {
      super(props);
      this.destroy = this.destroy.bind(this);
   }

   destroy() {
     var mount_node = ReactDOM.findDOMNode(this.refs.mount);

      try {
         ReactDOM.unmountComponentAtNode(mount_node);
      } catch (e) {
         console.error(e);
      }
   }

   
   render() {
      // Configure size and centering
      // Unit is px
      let width = (this.props.width) ? this.props.width : 445;
      let height = (this.props.height) ? this.props.height : 304;
      let top = (this.props.top) ? this.props.top : '50%';
      let left = (this.props.left) ? this.props.left : '50%';

      let style = {
        top: top,
        left: left,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        width: width,
        minHeight: height
      };
      
      let footer = null;

      // If closeButton == true, show only one button that says "close" and destroys the window
      if (this.props.closeButton) {
        footer =
          <div className="popup-footer">
            <Button type="cancel" onClick={() => {this.props.destroy();}}>Close</Button>
          </div>;
      }
      else {
        footer =
          <div className="popup-footer">
            <Button type="cancel" onClick={() => {this.props.cancel(); this.props.destroy(true);}}>Cancel</Button>
            <Button type="confirm" onClick={() => {this.props.okay(); this.props.destroy();}}>Okay</Button>
          </div>;
      }

      return (
         <div className="popup" style={style}>
            <div className="popup-header">{this.props.title}</div>
            <div className="popup-content"><div>{this.props.children}</div></div>
            {footer}
         </div>
      )
   }
}

export default Popup;