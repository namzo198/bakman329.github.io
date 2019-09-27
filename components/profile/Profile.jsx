import React from 'react'
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import {linkToName,getParsed,addToLocalStorageObject,AddfriendList,unFollowUser,followUser,registerEvent} from '../../utilities.js'
import {highLight,noHighLight} from '../../adaptations/Highlight.js';
import AutomationBoilerplate from '../../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import Timeline from "./Timeline.jsx"
import About from "./settings/About.jsx"
import FriendSubscription from "./FriendSubscription.jsx"
import BlockFriend from "./BlockFriend.jsx"
import Friends from "./Friends.jsx"
import ReactTooltip from 'react-tooltip';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    let adaptation = getParsed("adaptations")
    let adaptationVisited = getParsed("visited");
      

    this.state = {
        
        adaptation:adaptation,
        adaptationVisited:adaptationVisited,
        highlight: !adaptationVisited["Contact_Info"]["highlight"]&& (adaptation["contact_Info"] === "high") || !adaptationVisited["Basic_Info"]["highlight"]&& (adaptation["basic_Info"] === "high")?highLight:noHighLight,
        
        displayContactInfoSuggestion: !adaptationVisited["Contact_Info"]["suggestion"]&& (adaptation["contact_Info"] === "sugst"),
        
        displayBasicInfoSuggestion: !adaptationVisited["Basic_Info"]["suggestion"]&& (adaptation["basic_Info"] === "sugst"),
        
      
        //Suggestion: Unsubscribe from friend
        unsubscribe_suggestion:!adaptationVisited ["Unsubscribe_Friend"]["suggestion"]&& (adaptation["unsubscribe_Friend"] === "sugst"),
        unsubcribe_displaySuggestionPopup:true,
       // unsubscribe_label_Sugst:"We think you should Unfollow Jack Scout ",
        suggestAgree:true,
        
        //Suggestion: Categorize friend
        categorize_suggestion:!adaptationVisited ["Categorize_Friend"]["suggestion"]&& (adaptation["categorize_Friend"] === "sugst"),
        categorize_displaySuggestionPopup:true,
        
        
        //Unsubscribe from friend: AUtomation
        unsubscribe_automation:!adaptationVisited ["Unsubscribe_Friend"]["automation"]&& (adaptation["unsubscribe_Friend"] === "auto"),
        unsubscribe_action:"Adaptation was for unfollowing Jack Scout.",
        unsubscribe_displayAutomationPopup:true,
        unsubscribe_label_Auto: "Jack Scout was automatically unfollowed.",
        unsubscribe_context: "Unsubscribe_Friend",
        
        //Categorize Friend:Automation
        
        categorize_automation:!adaptationVisited ["Categorize_Friend"]["automation"]&& (adaptation["categorize_Friend"] === "auto"),
        categorize_action:"Adaptation was Categorize_Friend -> categorizing Sasha Riley as  a Recruiter",
        categorize_displayAutomationPopup:true,
        auto_CategorizeAccept: false,
        categorize_label_Auto: " Sasha Riley was automatically added to the \"Recruiters\" friends list",
        categorize_context: "Categorize_Friend",
      }

      this.changeStyle = this.changeStyle.bind(this);
      
  
      
         /*Automation Unsubscribe Adaptation*/
      this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
      this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      this.updateSubscribe = this.updateSubscribe.bind(this);
      
      
      /*Automation Categorization Adaptation*/
      this.onClickOk_CategorizeAuto = this.onClickOk_CategorizeAuto.bind(this);
      this.onClickUndo_CategorizeAuto = this.onClickUndo_CategorizeAuto.bind(this);
  }


    
    
    componentDidUpdate(prevProps,prevState){
        //console.log("I am in here in Profile");
        if(prevState.unsubscribe_automation !== this.state.unsubscribe_automation) {
        // console.log("I was called in here"+ this.state.unsubscribe_displayAutomationPopup+" and automation "+this.state.unsubscribe_automation);
        }
    }
    
   /*Methods for the Categorization Automation Adaptation*/
   onClickOk_CategorizeAuto(){
       
      
       
        this.setState({
              categorize_displayAutomationPopup:false,
        })
       
       AddfriendList(); 
       
    }
    
   onClickUndo_CategorizeAuto(){
       this.setState({
                 categorize_displayAutomationPopup:false,
            })
       
    }    
    
    
    /*Methods for the Automation Adaptation*/
   onClickOk_Auto(){
       
        unFollowUser(this.props.match.params.user);
        this.setState({
            unsubscribe_displayAutomationPopup:false,
            unsubscribe_automation:false,
            auto_CategorizeAccept:true,

        })
       
    }
    
   onClickUndo_Auto(){
       followUser(this.props.match.params.user);
       this.setState({
               unsubscribe_displayAutomationPopup:false,
               unsubscribe_automation :true,
            })
       
      
    }    
    
    updateSubscribe(){
        this.setState({suggestAgree:false})
    }
    
   componentWillReceiveProps(nextProps){
       
        let adaptationVisited = getParsed("visited");
       
       if (adaptationVisited["Contact_Info"]["suggestion"]) {
          
           this.setState({
               displayContactInfoSuggestion: false,
           })
       }
       
       if (adaptationVisited["Basic_Info"]["suggestion"] ) {
           
            this.setState({
               displayBasicInfoSuggestion: false,
           })
        }
               
   }
    
    changeStyle(){
        
        registerEvent("About_Button", `Clicked on About button on profile page of ${this.props.match.params.user } to see their contact Information`,"About Page");
        
        if(this.props.match.params.user === "alex_doe" &&(!this.state.adaptationVisited["Contact_Info"]['highlight'] || !this.state.adaptationVisited["Basic_Info"]['highlight']) ){
            this.setState({
             highlight:noHighLight
            })

        }
    }


render() {

    return (
        

      <div id="page-container">
        <div id="profile-content">
          <div className="top_container">
            <div className="cover_photo">
              {this.props.match.params.user === "alex_doe"?
              <div>
             <div className="dropdown">
             <button className="dropbtn" data-tip="Not Implemented">Update info </button>
           </div>

           <div className="dropdown_1">
             <button className="dropbtn_1" data-tip="Not Implemented">Activity log </button>
              <button className="btn" data-tip="Not Implemented">...</button>
            </div>
          </div>
           :<div>
           
            <Friends friendName={this.props.match.params.user} auto = {this.state.auto_CategorizeAccept}/> 
            
            <FriendSubscription friendName = {this.props.match.params.user} auto ={this.state.unsubscribe_automation} sugst={this.state.suggestAgree}/>
            
            <BlockFriend friendName = {this.props.match.params.user} />
            
          
           </div>
          }
          </div>

            <div className = "top_options">
              <ul className = "nav_top_options">
                <li><Link to={"/profile/" + this.props.match.params.user}>Timeline</Link></li>
                <li style={this.props.match.params.user === 'alex_doe'?this.state.highlight:null}><Link to={"/profile/" + this.props.match.params.user + "/about/overview"} onClick={this.changeStyle}>About</Link></li>
                <li>
                   <a href="#" data-tip="Not Implemented">Friends</a>
                    <ReactTooltip place="bottom" type="dark" effect="float"/>
                </li>
                
                <li>
                   <a href="#" data-tip="Not Implemented">Photos</a>
                    
                </li>
                
                <li>
                <a href="#" data-tip="Not Implemented">More</a>
                </li>
                
              </ul>
            </div>

              {/*console.log('The use name is'+ this.props.match.params.user.split("_")[0])*/}
              {/*console.log("The suggestion state is "+ this.state.displayContactInfoSuggestion)*/}

            <div className = "profile_photo">
              <img src ={'/assets/users/'+this.props.match.params.user.split("_")[0].toLowerCase()+'_profile_img.jpg'}/>
            </div>
            <h2>{linkToName(this.props.match.params.user)}</h2>
            
            
            {/*The Unsubscribe Automation Adaptation Popup*/ 
                (this.props.match.params.user === "jack_scout")&&this.state.unsubscribe_displayAutomationPopup && this.state.unsubscribe_automation && <AutomationBoilerplate action = {this.state.unsubscribe_action} context = {this.state.unsubscribe_context} label={this.state.unsubscribe_label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this. onClickUndo_Auto}/>
            }
             
              {/*The Categorization Automation Adaptation Popup*/ 
                (this.props.match.params.user === "sasha_riley") && this.state.categorize_displayAutomationPopup && this.state.categorize_automation && <AutomationBoilerplate action = {this.state.categorize_action} context = {this.state.categorize_context} label={this.state.categorize_label_Auto} onClickOK_Auto={this.onClickOk_CategorizeAuto} onClickUnDo_Auto = {this. onClickUndo_CategorizeAuto}/>
            }
           
          </div>
           <Switch>
                <Route path='/profile/:user/about/:section' component={About} />
                <Route path='/profile/:user' render={props => <Timeline {...props} displayContactInfoSuggestion ={this.state.displayContactInfoSuggestion} displayBasicInfoSuggestion ={this.state.displayBasicInfoSuggestion} displayUnsubscribeSuggestion = {this.state.unsubscribe_suggestion}  updateSubscribe ={this.updateSubscribe} displayCategorizeSuggestion = {this.state.categorize_suggestion}/>}/>
            </Switch>
        </div>
        
      </div>
    );
  }
}
export default Profile;