import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {getParsed} from '../../utilities.js'

class Friends extends React.Component {
    
    constructor(props) {
        super(props);
        
        let list = getParsed('list');
        console.log(list);
        this.state = {
            renderCreateList:false,
            currentLists:list,
            check: false,
        }
        
        //set a call back ref
        this.createFriendList = null;
        this.setFriendList = element => {
            this.createFriendList = element
        }
        this.handleClick = this.handleClick.bind(this);
        this.addCheck = this.addCheck.bind(this);
    }
    
    
    ComponentDidMount() {
       
        
        if(this.createFriendList) {
            this.createFriendList.focus();
        }
        
       
    }
    
    
    handleClick() {
        
        this.setState((prevState, props) => ({
            
            renderCreateList:!prevState.renderCreateList,
            
        }));
        //render the new list can do that here.
        //console.log("Your clicking Add to another list");
         //console.log(this.createFriendList);
    }
    
    addCheck() {
        this.setState((prevState,props) =>({
            check:!prevState.check,
        }));
    }
    
    
    render() {
        
        return (
            
           
            <div className="dropdown">
                    <div>
                        <button className="dropbtn">Friends ▼ </button>
                        <div className="dropdown-content">
                           {!this.state.renderCreateList?
                              <div>
                                 <a href="#">Get Notifications </a> 
                                 <hr></hr>
                                 <a href="#">Close friends</a>
                                 <a href="#">Acquaintances</a>
                                  
                                 <span ><Button onClick={this.handleClick} ref={this.setFriendList }>Add to another list </Button></span> 
                                  
                                <hr></hr>
                                 <a href="#">Unfriend</a>
                                </div>:
                            
                                 <div>
                                    <Button onClick={this.handleClick}>Go Back</Button> 
                                     <hr></hr>
                                     
                                      {this.state.currentLists.map((list,index)=>
                                         <Button onClick={this.addCheck} key={index}> {list}</Button>
                                       )
                                     }
                                     <a href="#"> ➕ New List</a>
                                 </div>
                            
                            }
                         </div>
                    </div>
            </div>
        )
    }
}

export default Friends;