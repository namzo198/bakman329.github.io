import React, {Component} from 'react'
import Button from '../../../Button.jsx'

class ExistingInfoDisplay extends Component{
    
    render(){
        
        return(
            <div className = "details_2">
              <div className = "edit">
                <img src = '/assets/edit_icon.png'/>
                <Button href ="javascript:void(0)"  onClick = {this.props.onClick}>Edit</Button>
              </div>

              <div className = "response">
                <label>{this.props.response}</label>
              </div>

              <li><label className="addedinfo_color">{this.props.infoName}</label></li>
            </div>
        )
    }
}

export default ExistingInfoDisplay;