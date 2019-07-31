import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button.jsx'
import {highLight,highLightExtended,No_highLight} from '../../adaptations/Highlight.js';
import {HighlightBoilerplate} from '../../adaptations/Highlight/HighlightBoilerplate.jsx';

import classNames from 'classnames'
import {getParsed} from '../../utilities.js'

class FriendSubscription extends React.Component {
   
    constructor(props) {
        super(props);
        
       let adaptation = getParsed('adaptations');
       let adaptationVisited = getParsed("visited");
        
        this.state = {
            subscribe:this.props.auto?false: true,  //true
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
        console.log("I am in here in the Friend to subscribe "+nextProps.auto);
        if (nextProps.auto != this.props.auto) {
            this.setState({subscribe:nextProps.auto})
        }
        
    }
    
    
   
    
    /*Method for the Highlight Adaptation
    changeStyle(){
        
        
         if(!this.state.adaptationVisited["Unsubscribe_Friend"]['highlight']){
             
             //console.log("I am in here");
            this.setState({
             highlight1:false,
            })
          }
        
        
    }*/
    
    handleClick() {
      if (this.state.subscribe) {
        /* let visited = JSON.parse(localStorage.featuresVisited);
        visited.friends.unfollow = true;
        localStorage.setItem("featuresVisited", JSON.stringify(visited)); */
        let used = JSON.parse(localStorage.featuresUsed);
        used.friends.unfollow = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));
      }
         
        this.setState(state => ({
            subscribe: !state.subscribe,
            
        }))
        
        
        
        if(!this.state.adaptationVisited["Unsubscribe_Friend"]['highlight']) {
            
            this.setState({
                //highlight: null,
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
        
         var dropbtn_style = classNames({
             'dropbtn_1':!this.state.highlight1,
             'dropbtn_1_highlight':this.state.highlight1,
         })
        return(
         <div className="dropdown_1">
             {this.state.subscribe?
              <div>
                
                <button className={dropbtn_style} onMouseOver={this.onFollowHover}>Following ▼</button>
                
                <div className="dropdown_content_1">
                    <a href="#">See First </a> 
                    <a href="#">Default</a>
                    <hr></hr>
                    <Button onClick={this.handleClick} style={this.state.highlight1?highLight:null}>Unfollow</Button>
                </div>
                <button className="btn"> Message </button>
                <button className="btn">...</button>
              </div> 
                :
                   <div>
                    <button className="dropbtn_1" onClick={this.handleClick}>Follow</button>
                    <button className="btn"> Message </button>
                    <button className="btn">...</button>
                   </div>
             }
             
             
        </div>
                 
        )
    }
}

export default FriendSubscription;

//<span style={highLight}><Button onClick={this.handleClick}>Unfollow</Button></span>

