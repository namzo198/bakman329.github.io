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
      return (
         <div className="popup">
            <div className="popup-header">{this.props.title}</div>

            <div className="popup-content"><div>{this.props.children}</div></div>

            <div className="popup-footer">
               {/* TODO: Only pressing "Okay" should register the new setting in state */}
               <Button href='javascript:void(0)' onClick={this.props.destroy}>Okay</Button>
               <Button href='javascript:void(0)' onClick={this.props.destroy}>Cancel</Button>
            </div>
         </div>
      )
   }
}

export default Popup;