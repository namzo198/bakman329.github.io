import React, {Component} from 'react'
import Button from '../../../Button.jsx'
import classNames from 'classnames';

class ExistingInfoDisplay extends Component{
    
    render(){
        
        var responseStyle = classNames({
            'response':true,
            'high1':this.props.adapt
        })
        
        return(
            <div className = "details_2">
              <div className = "edit">
                <img src = '/assets/edit_icon.png'/>
                <Button href ="javascript:void(0)"  onClick = {this.props.onClick} adapt ={this.props.adapt}>Edit</Button>
              </div>

              <div className ={responseStyle}>
                <label>{this.props.response}</label>
              </div>

              <li><label className="addedinfo_color">{this.props.infoName}</label></li>
            </div>
        )
    }
}

export default ExistingInfoDisplay;