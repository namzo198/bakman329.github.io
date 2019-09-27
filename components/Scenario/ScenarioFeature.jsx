import React from 'react'

class ScenarioFeature extends React.Component  {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    
    handleClick() {
      this.props.action();  
    }
    //${this.props.icon}
    render() {
        
        let buttonStyle =  {
               // backgroundImage: url("/assets/scenario/add.png");
            };

        let label;


        return (
             <div>
                <div onClick={this.handleClick} className="scenario-menu-item"> 
                
                {this.props.label !=""? <label>{this.props.label}</label>:null}
                
                 <div className={this.props.id != 'mainDescription'? "scenario-menu-icon-number": "scenario-menu-icon"}>  
                     
                   {this.props.id != 'mainDescription'? 
                     
                     <span className="number-icon">
                       {this.props.icon}
                    </span>:
                     
                    <div>
                        <i className="material-icons">{this.props.icon}
                         </i> 
                         <span className="list-text">Items
                         </span>
                        </div>  
                    } 
                  
                    </div>
                 </div> 
    
                  
            </div>
                

            )
       }
    }

export default ScenarioFeature;

/*
<div className=".scenario-done-button">DONE</div>
 <!--<label>{this.props.label}</label> -->
*/