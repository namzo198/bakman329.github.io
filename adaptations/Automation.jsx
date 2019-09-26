import React from 'react'
import Button from '../components/Button.jsx'

class Automation extends React.Component{
  render() {
   var okButton_option;

   if (this.props.onOkClick !== undefined) {
      okButton_option = <Button id='undo' href='javascript:void(0)' onClick={this.props.onOkClick} routeTo={this.props.routeTo}>{this.props.okButton}</Button>;
    }

    var divStyle = {marginLeft: '15px',fontSize:'11px',}

    return(
        <div id = "automation-block">
            <div id="automation-flag">
              <img src={'/assets/flag.png'} />
            </div>
             <label style={divStyle}>{this.props.label}</label>
            
            <Button id='undo' href='javascript:void(0)' onClick={this.props.onUndoClick}>  {this.props.undoButton}
            </Button>
            
            {okButton_option}

        </div>
    );
  }
}

export default Automation;
