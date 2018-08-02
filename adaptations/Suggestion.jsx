import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../components/Button.jsx'
import Chat from '../components/Chat.jsx'

class SuggestionPopup extends React.Component{
  constructor(props){
    super(props);

    this.destroy = this.destroy.bind(this); 
    this.allow = this.allow.bind(this);
  }


destroy(i) {
 var mount_node = ReactDOM.findDOMNode(this.refs.mount);

  try {
    ReactDOM.unmountComponentAtNode(mount_node);
    return i;
  } catch (e) {
    console.error(e);
  }
 }

  allow(i){
    var mount_node = ReactDOM.findDOMNode(this.refs.mount);
    <Chat /> 
    try {
      ReactDOM.unmountComponentAtNode(mount_node);
    } catch (e) {
      console.error(e);
    } 
  }

  render(){
    return(
      <div id="pop" className="suggestPopup">
        <div className="popup-header">{this.props.title}</div>
        <a className="suggestPopupCloseButton" href="javascript:void(0)" onClick={this.props.destroy}>X</a>
        <div className="suggest_popup-content"><div>{this.props.children}</div>

        <div className="suggest_popup-footer">
          <span className="leftbutton"><Button href='javascript:void(0)' onClick={this.props.destroy}>Rather Not</Button></span>
          <span className="rightbutton"><Button href='javascript:void(0)' onClick={this.props.allow}>OK</Button></span> 
        </div>
        </div>
      </div>
    )
  }
}

export default SuggestionPopup;