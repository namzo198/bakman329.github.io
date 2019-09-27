import React, {Component} from 'react'
import Button from '../../../Button.jsx'

class EditInfoDisplay extends Component{
    
    render(){
       
        
        return(
        <div className="display_inputform">
             <input type="text"
                  placeholder={this.props.placeholder}
                  name={this.props.infoName}
                  onChange={this.props.onChange}
                  value={this.props.value}
               />
               
              <Button type="confirm" style={{display:"inline-block", margin:"5px"}} href='javascript:void(0);'
                  onClick = {this.props.onClickSave}
                  className = "saveButton">Save Changes</Button>

             <Button type="cancel"  style={{display:"inline-block", margin:"5px"}}  href='javacript:void(0);'
                  onClick = {this.props.onClickCancel}
                  >Cancel</Button> 
        </div>
        
        )
    }
}

export default EditInfoDisplay;