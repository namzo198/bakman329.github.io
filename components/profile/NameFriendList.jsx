import React from 'react';
import ReactDoM from 'react-dom';

class NameFriendList extends React.Component {
  constructor(props){
      super(props)
      
      this.state = {
          name:"",
      }
     
      
      this.handleChange = this.handleChange.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      
  } 
    
    handleChange(e) {
        
        this.setState({
            name:e.target.value,
        })
    }
    
    
    onKeyDown(e){
        e.persist();
        
        if (e.keyCode == 13) {
            
            if(this.state.name !== "") {
                 this.props.addNewList(this.state.name)
                this.setState({name:""})
             }
            
          
        }
        
    }
    
    
    
    render(){
        return(
        <div>
            <input id="FriendListtext" type="text" placeholder="New List..."  onKeyDown={this.onKeyDown} onChange={this.handleChange}/>
        </div>
        )
    }
}

export default NameFriendList;