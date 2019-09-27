import React, {Component} from 'react'
import Button from '../../../Button.jsx'
import Automation from '../../../../adaptations/Automation.jsx'

class AddInfoDisplay extends Component{

    
     
    render(){
        
        return(
            <div className = "details_2">
                <li>
                    <Button href="javascript:void(0)" onClick ={this.props.onClickToggle} adapt= {this.props.adapt}>{this.props.add_request} </Button>
                </li>
            </div>
            )
        
    }
}

export default AddInfoDisplay;