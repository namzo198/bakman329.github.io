import React from 'react';
import Button from '../../Button.jsx';

class Edit extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            edit:false,
        }
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onAudienceChange= this.onAudienceChange.bind(this);
        
        
    }
    
    //enable change of audience(cf:https://stackoverflow.com/questions/40795906/onchange-event-for-react-child-component-to-update-state )
    
    onAudienceChange(audience){
        //Include the action to be taken when the audience is selected.
        //console.log("The audience has been selected")
        
        this.props.changeAudience(this.props.audienceType,audience)
    }
    
    //Open the edit dialog
    onClickEdit(){
       this.setState({edit:true}) 
    }
    
    //Close the edit dialog
    onClose(){
        this.setState({edit:false})
    }
    
    //The normal display
    renderNormal(){
        return(
            <div>
                 <div className="right_link">
                    <Button href="javascript:void(0)" onClick={this.onClickEdit}>Edit</Button>
                    
                    </div>
                    <div className="edit_audience_selected">{this.props.audience}</div>
                    <div className = "righttop_text">{this.props.description}</div>
                    
            </div>
        )
    }
    
    //The edit dialog
    renderEditForm(){
        return(
            <div>
                {this.props.renderEditForm(this.props.audienceType,this.props.description,this.props.edit_description,this.onAudienceChange,this.onClose)}
           </div>
        )
    }
    

    render(){
       //Renders either the normal view or editDialog based on activation
        return(
            <div>
                {this.state.edit?this.renderEditForm():this.renderNormal()}
            </div>
            )
       }

   
}


export default Edit;