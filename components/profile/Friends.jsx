import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {getParsed,addToLocalStorageObject} from '../../utilities.js'
import NameFriendList from './NameFriendList.jsx'


class Friends extends React.Component {
    
    constructor(props) {
        super(props);
        
        let list = getParsed('list');
        
        const listIdCounter = 2;
        this.state = {
            renderCreateList:false,
            currentLists:list,
            check: false,
            idCounter:listIdCounter,
            displayInputText:false,
        }
        
        //set a call back ref
        //this.createFriendList = null;
        //this.setFriendList = element => {
       //     this.createFriendList = element
        //}
        
        this.handleClick = this.handleClick.bind(this);
        this.addCheck = this.addCheck.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.input = this.input.bind(this);
    }
    
    
   /* ComponentDidMount() {
       
        
        if(this.createFriendList) {
            this.createFriendList.focus();
        }
        
       
    }*/
    
    componentDidUpdate(prevProps,prevState) {
        
        if (prevState.currentLists !== this.state.currentLists){
            addToLocalStorageObject("list",this.state.currentLists);
        }
        
    }
    
    handleClick() {
        
        this.setState((prevState, props) => ({
            
            renderCreateList:!prevState.renderCreateList,
            
        }));
        
    }
    
    addCheck(itemId) {
    
        
       this.setState(prevState => ({
           
           currentLists: prevState.currentLists.map ((list,index)=>{
                              
                          if( list.id == itemId){
                              
                              list.addtick = !list.addtick;
                            }
                         
                        return list;
                       })
           
           
          
       }));

    }
    
    addNewList(NewListname) {
        
        const nextId = this.state.idCounter+1;
        const listName = NewListname;
        const newList = [...this.state.currentLists, 
                        {id:nextId,name:listName, addtick:true}
                        ]
        
        //TODO: save list to local storage
        
        this.setState({
            currentLists:newList,
            idCounter:nextId,
            displayInputText:false,
        })
    }
    
    input() {
        
        this.setState({
            displayInputText:true,
        })
    }
    
    
    render() {
        
        return (
            
           
            <div className="dropdown">
                    <div>
                        <button className="dropbtn"> ✓ Friends ▼ </button>
                        <div className="dropdown-content">
                           {!this.state.renderCreateList?
                              <div>
                                 <a href="#">Get Notifications </a> 
                                 <hr></hr>
                                 <a href="#">Close friends</a>
                                 <a href="#">Acquaintances</a>
                                  
                                 <span ><Button onClick={this.handleClick}>Add to another list </Button></span> 
                                  
                                <hr></hr>
                                 <a href="#">Unfriend</a>
                                </div>:
                            
                                 <div>
                                   
                                    <Button onClick={this.handleClick}>Go Back</Button> 
                                     <hr></hr>
                                     <small className="addtoList">Add to Lists:</small>
                                      {this.state.currentLists.map((listItem,index)=>
                                         <Button key= {listItem.id} onClick={() => this.addCheck(listItem.id)} ><span>{listItem.addtick? " ✓ ":null}</span> {listItem.name}</Button>
                                       )
                                     }
                                     
                                {this.state.displayInputText?<NameFriendList addNewList={this.addNewList}/>:<Button onClick={this.input}> ➕ New List</Button>}
                                
                                 </div>
                            
                            }
                         </div>
                    </div>
            </div>
        )
    }
}

export default Friends;