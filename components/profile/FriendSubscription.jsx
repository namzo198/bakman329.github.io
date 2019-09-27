import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {highLight,highLightExtended,No_highLight} from '../../adaptations/Highlight.js';
import {HighlightBoilerplate} from '../../adaptations/Highlight/HighlightBoilerplate.jsx';

import classNames from 'classnames'
import {getParsed,getFollowStatus,unFollowUser,followUser,registerEvent} from '../../utilities.js'

class FriendSubscription extends React.Component {
   
    constructor(props) {
        super(props);
        
       let adaptation = getParsed('adaptations');
       let adaptationVisited = getParsed("visited");
       let getSubscribeStatus = getFollowStatus(this.props.friendName);
        
        
        this.state = {
            subscribe:this.props.auto?!this.props.auto:getSubscribeStatus, 
            adaptationVisited:adaptationVisited,
            highlight1: !adaptationVisited["Unsubscribe_Friend"]["highlight"] && (adaptation["unsubscribe_Friend"] == "high")? true:false,
            //highlight: !adaptationVisited["Unsubscribe_Friend"]["highlight"] && (adaptation["unsubscribe_Friend"] == "high")? "high":null,
            context:"Unsubscribe_Friend",
            
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.onFollowHover = this.onFollowHover.bind(this);
      
        /*Highlight Adaptation */
        // this.changeStyle = this.changeStyle.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        
       
       if (nextProps.auto !== this.props.auto  ) {
            this.setState({subscribe:nextProps.auto})
           
        } else if(nextProps.sugst !== this.props.sugst) {
            this.setState({subscribe:nextProps.sugst})
            
        }else {
            
            this.setState({subscribe:true})
        }
        
    }

    handleClick(element) {
      if (this.state.subscribe) {
        /* let visited = JSON.parse(localStorage.featuresVisited);
        visited.friends.unfollow = true;
        localStorage.setItem("featuresVisited", JSON.stringify(visited)); */
        let used = JSON.parse(localStorage.featuresUsed);
        used.friends.unfollow = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));
      }
         
         if(element === "Unfollow") {
          registerEvent("Unfollow _user",`${this.props.friendName} was unfollowed`,"Timeline")
           unFollowUser(this.props.friendName);
         }
        
        if(element === "Follow") {
           followUser(this.props.friendName);
         }
        
        this.setState(state => ({
            subscribe: !state.subscribe,
            
        }))
        
        if(this.state.highlight1 && (this.props.friendName === "jack_scout") ) {
            
            this.setState({
                highlight1: false,
            })
            
          HighlightBoilerplate(this.state.context);
        }
        
    }

    onFollowHover() {
      if (this.state.subscribe) {
        let visited = JSON.parse(localStorage.featuresVisited);
        visited.friends.unfollow = true;
        localStorage.setItem("featuresVisited", JSON.stringify(visited));
      }
    }
    
    render() {
        
        //console.log(getFollowStatus(this.props.friendName));
         var dropbtn_style = classNames({
             'dropbtn_1':!this.state.highlight1 || (this.props.friendName !== "jack_scout") && this.state.highlight1,
             'dropbtn_1_highlight':(this.props.friendName === "jack_scout") && this.state.highlight1,
         })
         
        return(
         <div className="dropdown_1">
             {this.state.subscribe?
              <div>
                

                <button className={dropbtn_style} onMouseOver={this.onFollowHover}> ✓ Following ▼</button>
                
                <div className="dropdown_content_1">
                    <a href="#">See First </a> 
                    <a href="#">Default</a>
                    <hr/>
                    <span className={(this.props.friendName === "jack_scout") && this.state.highlight1?"high1":null}><Button onClick={() => this.handleClick("Unfollow")}>Unfollow</Button></span>
                </div>
                
                <button className="btn"> Message </button>
                
                
                
                {/*
                 <button className="btn">...</button>
                     <div className="dropdown_content_1">
                         <a href="#">See friendship</a>
                         <a href="#">Invite Jack to like your pages</a>
                         <a href="#">Find Support or report profile</a>
                         <a href="#"> Block </a>
                     </div>
                
                        <button className="btn">...</button>*/}
             
              </div> 
                :
                   <div>
                    <button className="dropbtn_1" onClick={() => this.handleClick("Follow")}>Follow</button>
                    <span data-tip="Not Implemented" >
                       <button className="btn"> Message </button>
                    </span>
                   </div>
             }
             
             
        </div>
                 
        )
    }
}

export default FriendSubscription;

