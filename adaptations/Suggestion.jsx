import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../components/Button.jsx'
import Chat from '../components/Chat.jsx'
import Draggable from 'react-draggable';

class SuggestionPopup extends React.Component{
  constructor(props){
    super(props);

    this.destroy = this.destroy.bind(this);
    this.allow = this.allow.bind(this);
  }


destroy() {
 var mount_node = ReactDOM.findDOMNode(this.refs.mount);

  try {
    ReactDOM.unmountComponentAtNode(mount_node);
    //return i;
  } catch (e) {
    console.error(e);
  }
 }

  allow(i){
    var mount_node = ReactDOM.findDOMNode(this.refs.mount);

    try {
      ReactDOM.unmountComponentAtNode(mount_node);
    } catch (e) {
      console.error(e);
    }
  }

  render(){
    return(
     <Draggable enableUserSelectHack={false} cancel=".not-draggable">
      <div id="suggestPopup">
        <div className="popup-header">{this.props.title}</div>
        <a className="suggestPopupCloseButton" href="javascript:void(0)" onClick={() => this.props.destroy("Dismissed")}>X</a>
        <div className="suggest_popup-content"><div>{this.props.children}</div>
        <br/>
        <div className="suggest_popup-footer">
          <span className="popup-footer"><Button type="cancel" href='javascript:void(0)' onClick={()=> this.props.destroy("Rather Not follow")}>Rather Not</Button></span>
          <span className="popup-footer"><Button type="confirm" href='javascript:void(0)' onClick={this.props.okay} routeTo = {this.props.routeTo}>OK</Button></span>
        </div>
        </div>
      </div>
    </Draggable>
    )
  }
}

export default SuggestionPopup;
