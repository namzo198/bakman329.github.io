import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {getParsed,addToLocalStorageObject, registerEvent} from '../../utilities.js'
import NameFriendList from './NameFriendList.jsx'
import {HighlightBoilerplate} from '../../adaptations/Highlight/HighlightBoilerplate.jsx';
import ReactTooltip from 'react-tooltip';


class Friends extends React.Component {
    
    constructor(props) {
        super(props);
        
        let list = getParsed('list');
        let adaptation = getParsed('adaptations');
        let adaptationVisited = getParsed("visited");
        
        const listIdCounter = 2;
        this.state = {
            renderCreateList:false,
            currentLists:list,
            check: false,
            idCounter:listIdCounter,
            displayInputText:false,
            adaptationVisited:adaptationVisited,
            highlight1: !adaptationVisited["Categorize_Friend"]["highlight"] && (adaptation["categorize_Friend"] == "high")? true:false,
            context:"Categorize_Friend"
        }
        
        
        this.handleClick = this.handleClick.bind(this);
        this.addCheck = this.addCheck.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.input = this.input.bind(this);
        this.unfriend = this.unfriend.bind(this);
    }
    
    

    
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
    registerEvent(`Categorize Friend: ${this.props.friendName}`, `Added Check Mark to List ID ${itemId}`, "Timeline")
        
       this.setState(prevState => ({
           
           currentLists: prevState.currentLists.map ((list,index)=>{
                              
                          if(list.id == itemId && !list.members.includes(this.props.friendName)){
                              
                          
                              //list.addtick = !list.addtick;
                               list.members = list.members.concat(this.props.friendName)
                              
                            }else {
                                
                                
                                if(list.id == itemId) {
                                    list.members = list.members.filter((name,index,array)=> {
                                        return name != this.props.friendName;
                                    })
                                }
                            } 
                           
                          
                         
                           return list;
                       })
           
           
          
       }));
        
         if(this.state.highlight1 && (this.props.friendName === "sasha_riley")) {
            
            this.setState({
                highlight1: false,
            })
            
          HighlightBoilerplate(this.state.context);
        }

    }
    
    addNewList(NewListname) {
        
     registerEvent(`Categorize Friend: ${this.props.friendName}`, `Created New Friend List ${NewListname}`, "Timeline")
    
        const nextId = this.state.idCounter+1;
        const listName = NewListname;
        const newList = [...this.state.currentLists, 
                        {id:nextId,name:listName, members:[this.props.friendName]}
                        ]
        
        //TODO: save list to local storage
        
        this.setState({
            currentLists:newList,
            idCounter:nextId,
            displayInputText:false,
        })
        
         if(!this.state.adaptationVisited["Categorize_Friend"]['highlight'] && (this.props.friendName === "sasha_riley")) {
            
            this.setState({
                highlight1: false,
            })
            
          HighlightBoilerplate(this.state.context);
        }
    }
    
    unfriend () {
        
      registerEvent("Clicked on UnFriend", "Tried to Unfriend "+this.props.friendName, "Timeline: Friends Dropdown ");
        //unFollowUser(this.props.friendName)
       // console.log("I have been clicked")
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
                        <button className = {this.state.highlight1 && (this.props.friendName === "sasha_riley")?"dropbtn_highlight":"dropbtn" }> ✓ Friends ▼ </button>
                        <div className="dropdown-content">
                           {!this.state.renderCreateList?
                              <div>
                                 <a href="javascript:void(0)" data-tip="Not Implemented" data-place="top" data-event="click">Get Notifications </a>
                                 
                                 <hr></hr>
                                 <a href="javascript:void(0)">Close friends</a>
                                 <a href="javascript:void(0)">Acquaintances</a>
                                  
                                 <span className={this.state.highlight1 && (this.props.friendName === "sasha_riley")?"high1":null} ><Button onClick={this.handleClick}>Add to another list </Button></span> 
                                  
                                <hr></hr>
                                 <span data-tip="Not Implemented"  data-event="click">
                                   <Button onClick={this.unfriend}  >Unfriend</Button>
                                 </span>
                                </div>:
                            
                                 <div>
                                   
                                    <Button onClick={this.handleClick}>Go Back</Button> 
                                     <hr></hr>
                                     <small className="addtoList">Add to Lists:</small>
                                      {this.state.currentLists.map((listItem,index)=>
                                         <Button key= {listItem.id} onClick={() => this.addCheck(listItem.id)} ><span>{ listItem.members.includes(this.props.friendName)? " ✓ ":null}</span> {listItem.name}</Button>
                                       )
                                     }
                                     
                                {this.state.displayInputText?<NameFriendList addNewList={this.addNewList}/>:<span className={this.state.highlight1 && (this.props.friendName === "sasha_riley")?"high1":null} ><Button onClick={this.input}> ➕ New List</Button></span>}
                                
                                 </div>
                            
                            }
                         </div>
                    </div>
            </div>
        )
    }
}

export default Friends;
