import React from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {linkToName,getParsed,addToLocalStorageObject} from '../../utilities.js'
import {highLight,noHighLight} from '../../adaptations/Highlight.js';
import AutomationBoilerplate from '../../adaptations/Automation/AutomationBoilerplate.jsx'
import Timeline from "./Timeline.jsx"
import About from "./settings/About.jsx"
import FriendSubscription from "./FriendSubscription.jsx"
import Friends from "./Friends.jsx"

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let adaptation = getParsed("adaptations")
    let adaptationVisited = getParsed("visited");

    this.state = {
        
        adaptation:adaptation,
        adaptationVisited:adaptationVisited,
        highlight: !adaptationVisited["ContactInfo"]["highlight"]&& (adaptation["contactInfo"] === "high")?highLight:noHighLight,
        displayContactInfoSuggestion: !adaptationVisited["ContactInfo"]["suggestion"]&& (adaptation["contactInfo"] === "sugst"),
        
        //Suggestion: Unsubscribe from friend
        suggestion:!adaptationVisited ["Unsubscribe_Friend"]["suggestion"]&& (adaptation["unsubscribe_Friend"] === "sugst"),
        
        //Unsubscribe from friend: AUtomation
        unsubscribe_automation:!adaptationVisited ["Unsubscribe_Friend"]["automation"]&& (adaptation["unsubscribe_Friend"] === "auto"),
        unsubscribe_action:"Unsubscribe_Friend, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)",
        unsubscribe_displayAutomationPopup:true,
        unsubscribe_label_Auto: "You were automatically unsubscribed from following Jack Scout",
        unsubscribe_context: "Unsubscribe_Friend",
        test:true,
      }

      this.changeStyle = this.changeStyle.bind(this);
      
         /*Automation Adaptation*/
      this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
      this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
  }

    componentDidUpdate(prevProps,prevState){
        if(prevState.unsubscribe_automation != this.state.unsubscribe_automation) {
         console.log("I was called in here"+ this.state.unsubscribe_displayAutomationPopup+" and automation "+this.state.unsubscribe_automation+" Test"+this.state.test);
        }
    }
    
    /*Methods for the Automation Adaptation*/
   onClickOk_Auto(){
       
       console.log("Automation ok has been clicked");   
       
        this.setState({
            unsubscribe_displayAutomationPopup:false,
            unsubscribe_automation:false,
            test:false,
        })
       
       
       //this.forceUpdate();
      /* this.setState({
           test:true,
       })*/

       
    
       //this.post()
    }
    
   onClickUndo_Auto(){
    
       //console.log("Undo Automation has been clicked"); 
       
       this.setState({
               unsubscribe_displayAutomationPopup:false,
            unsubscribe_automation:true,
            })
       
      
    }    
    
    
   componentWillReceiveProps(nextProps){
       if(this.state.displayContactInfoSuggestion !== (this.state.adaptationVisited["ContactInfo"]["suggestion"]&&this.state.adaptation["contactInfo"] === "sugst")){

           this.setState({
               displayContactInfoSuggestion: this.state.adaptationVisited["ContactInfo"]["suggestion"]
           })

           //console.log("The visited state of suggestion in components will receive props" + this.state.displayContactInfoSuggestion)
       }
   }
    
    changeStyle(){
        if(!this.state.adaptationVisited["ContactInfo"]['highlight']){
            this.setState({
             highlight:noHighLight
            })

        }
    }


render() {

{/*console.log("The display box: "+  this.state.unsubscribe_displayAutomationPopup)*/}

{/*console.log("The automation state:"+  this.state.unsubscribe_automation)
*/}
    
{/*console.log("Test "+this.state.test)*/} 
    
    return (
        

      <div id="page-container">
        <div id="profile-content">
          <div className="top_container">
            <div className="cover_photo">
              {this.props.match.params.user == "Alex_doe"?
              <div>
             <div className="dropdown">
             <button className="dropbtn">Update info </button>
           </div>

           <div className="dropdown_1">
             <button className="dropbtn_1">Activity log </button>
              <button className="btn">...</button>
            </div>
          </div>
           :<div>
           
            <Friends/> 
            <FriendSubscription auto={this.state.unsubscribe_automation}/>
             
          
           </div>
          }
          </div>

            <div className = "top_options">
              <ul className = "nav_top_options">
                <li><Link to={"/profile/" + this.props.match.params.user}>Timeline</Link></li>
                <li style={this.state.highlight}><Link to={"/profile/" + this.props.match.params.user + "/about/overview"} onClick={this.changeStyle}>About</Link></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">Photos</a></li>
                <li><a href="#">More</a></li>
              </ul>
            </div>

              {/*console.log('The use name is'+ this.props.match.params.user.split("_")[0])*/}
              {/*console.log("The suggestion state is "+ this.state.displayContactInfoSuggestion)*/}

            <div className = "profile_photo">
              <img src ={'/assets/users/'+this.props.match.params.user.split("_")[0]+'_profile_img.jpg'}/>
            </div>
            <h2>{linkToName(this.props.match.params.user)}</h2>
            
            {/*The Automation Adaptation Popup*/ 
                this.state.unsubscribe_displayAutomationPopup && this.state.unsubscribe_automation && <AutomationBoilerplate action = {this.state.unsubscribe_action} context = {this.state.unsubscribe_context} label={this.state.unsubscribe_label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this. onClickUndo_Auto}/>
            }
            
          </div>
          <Switch>
            <Route path='/profile/:user/about/:section' component={About} />
            <Route path='/profile/:user' render={(props) => <Timeline {...props}  displayContactInfoSuggestion ={this.state.displayContactInfoSuggestion} />}/>
          </Switch>
        </div>
      </div>
    );
  }
}
export default Profile;