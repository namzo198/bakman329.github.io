import React, {Component} from 'react'
import Automation from '../Automation.jsx'
import {saveVisitedAdaptation} from '../../utilities.js'

class AutomationBoilerplate extends Component {
    constructor(props){
        super(props)

        this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
       this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
        this.visited = this.visited.bind(this);

    }

    visited(feature,name){
        saveVisitedAdaptation(feature, name);
        //this.props.destroy();
    }
 
   

    onClickOk_Auto() {
        var event = {
            action: `Automation: ${this.props.context}`,
            context: "1",
            object: this.props.action
        }

        this.props.onClickOK_Auto();
        this.visited(this.props.context, "automation")
        return event;
    }

    onClickUndo_Auto(){
        var event = {
            action: `Undo_Automation: ${this.props.context}`,
            context: "0",
            object: this.props.action
        }

        this.props.onClickUnDo_Auto();
        this.visited(this.props.context,"automation")
        return event;
    }

    render(){
        return(
        <div id ='except-warning'>
                <Automation undoButton="Undo" okButton="Ok" onOkClick={this.onClickOk_Auto} label={this.props.label} onUndoClick={this.onClickUndo_Auto} routeTo={this.props.routeTo != undefined? this.props.routeTo:null}/></div>
       )
    }

}

export default AutomationBoilerplate;
