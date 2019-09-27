import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button.jsx';
import classNames from 'classnames'
import Draggable from 'react-draggable';

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
      let Okay = (this.props.okButtonName)? this.props.okButtonName: "Okay";
      let close_button = null;
      
     // console.log(this.props.okButtonName)
      
      let style = {
        top: top,
        left: left,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        width: width,
        minHeight: height 
      };

      let header_style = {
        backgroundColor: "#6d84b4",
        color: "#ffffff"
      };

      if (this.props.grayHeader) {
        header_style = {
          backgroundColor: "#f5f6f7",
          color: "#1d2129"
        }
      }

      if(this.props.warningHeader) {
        header_style = {
          backgroundColor: "#f0ad4e",
          color: "#ffffff"
        }
      }
      
      let footer = null;
      var contentStyle = classNames({
         'popup-content': !this.props.content_style,
         'popup-content_altHeight':this.props.content_style
      });
   
       var headerColor = classNames({
           'popup-header': !this.props.header_style,
           'popup-header_altColor': this.props.header_style
       });

      // If closeButton == true, show only one button that says "close" and destroys the window
      if (this.props.closeButton) {
        footer =
          <div className="popup-footer">
            <Button type="confirm" onClick={() => {this.props.cancel();}} routeTo = {this.props.routeTo != undefined?this.props.routeTo:null}>{this.props.closeButtonName}</Button>
          </div>;
      } else if (this.props.saveChanges) {
        footer =
          <div className="popup-footer">
            <Button type="confirm"
              onClick={() => {this.props.okay(); 
                              this.props.destroy()}}
              isDisabled={this.props.confirmDisabled}>Save Changes</Button>
            <Button type="cancel" onClick={() => {this.props.cancel(); this.props.destroy(true);}}>Cancel</Button>
          </div>;
        } else {
        footer =
          <div className="popup-footer">
            <Button type="cancel" onClick={() => {this.props.cancel();  this.props.destroy(true)}}>Cancel</Button>
            <Button type="confirm"
               onClick={() => {this.props.okay(); this.props.destroy();}}
               isDisabled={this.props.confirmDisabled} routeTo = {this.props.routeTo != undefined?this.props.routeTo:null}>    {this.props.okButtonName != undefined? this.props.okButtonName:Okay}
            </Button>
          </div>;
      }
       
       if (this.props.closeButton){
           close_button = <Button  onClick= {() => {this.props.cancel();}}><span className="close-thin">X</span></Button>
       }
       
      return (
        <Draggable enableUserSelectHack={false} cancel=".not-draggable">
         <div className="popup" style={style}>
            <div className="popup-header" style={header_style}>
              {this.props.title}
              {close_button}
            </div>
            <div className="popup-content" className={contentStyle}>
               <div id={(this.props.noPadding) ? "popup-no-padding" : ""}>{this.props.children}</div>
            </div>
            {!this.props.noFooter?footer:""}
         </div>
         </Draggable>
      )
   }
}

export default Popup;
