import React from 'react';
import Popup from '../../Popup.jsx';

class CheckBox extends React.Component {
    constructor(props){
        super(props);

        this.state={
            allow_search:false,
            renderpopup:false,
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        
        this.setState({  
            allow_search:true,
        })
    }
    
    
    turnoff(){
        this.props.changeAudience("search_index","No") 
        this.setState({
            allow_search:false,
            renderpopup:false,
        })
    }
    
    cancel(){
        this.setState({
            allow_search:true,
            renderpopup:false
        })
    }
    
    handleInputChange(event){
       
     const target = event.target
     const value = target.checked;
     const name = target.name;
        
        
        if(value===true){
           this.props.changeAudience("search_index","Yes") 
        }else{
     
          this.setState({
             renderpopup:true,
          })    
            
        }
        this.setState({
            allow_search: value
        })
           
    }
    
    render(){
        return(
        <div>
            <label>
             <span className="privacy_public_search_input">
                <input 
                    name="allow_search"
                    type="checkbox"
                    checked={this.state.allow_search}
                    onChange={this.handleInputChange}
                />
                 {this.props.label}
                 </span>
            </label>
            
            { this.state.renderpopup &&
                <Popup title ="Are you sure?" cancel={()=> this.cancel()} destroy= {()=> null}  okay={()=>this.turnoff()} okButtonName="Turn Off" width={465} height={10} content_style={true}>
                   
                    <div>
                        Turning this off means that your friends may not be able to find your Profile if they use a search engine outside of Fakebook.
                    </div>

                   </Popup>
            }
        </div>
        )
        
        
    }
}

export default CheckBox;