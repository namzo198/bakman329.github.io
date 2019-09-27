import React from 'react'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import AudienceMenu from './AudienceMenu.jsx'
import PostArea from './PostArea.jsx'
import UploadPopup from './UploadPopup.jsx'
import{addToLocalStorageObject,getParsed,saveVisitedAdaptation,getCurrentFriendLists,registerEvent} from '../utilities.js';
import AutomationBoilerplate from '../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import {highLight,highLightExtended,No_highLight} from '../adaptations/Highlight.js';

class NewPostArea extends React.Component {
   constructor(props) {
      super(props);
      
    let adaptation = getParsed('adaptations');
    let adaptationVisited = getParsed("visited");
         
      this.state = {value: '',
                    photo: '',
                    audience: 'public',
                    adaptationVisited:adaptationVisited,
                    renderUploadPopup: false,
                    suggestion: !adaptationVisited ["Status_Audience"]["suggestion"]&& (adaptation["status_Audience"] === "sugst"),
                    highlight1: !adaptationVisited["Status_Audience"]["highlight"] && (adaptation["status_Audience"] == "high")? true:false,
                    highlight: !adaptationVisited["Status_Audience"]["highlight"] && (adaptation["status_Audience"] == "high")? true:false,
                    automation:!adaptationVisited ["Status_Audience"]["automation"]&& (adaptation["status_Audience"] === "auto"),
                    displayAutomationPopup:false,
                    displaySuggestionPopup:false,
                    action:"Adaptation was for Custom audience -> To exclude from sharing with Colleagues",
                    context:"Status_Audience",
                    label_Sugst:" Hi Alex - You seem to be posting about looking for a job. With the current settings, this post would be visible to all including your current colleagues. Do you want to restrict your custom friend list “Colleagues” from seeing this post?",
                    label_Auto: "Your friend list “colleagues” has automatically been restricted from seeing this post.",
                    
                   };
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onClickPhoto = this.onClickPhoto.bind(this);
      this.onChangeAudience = this.onChangeAudience.bind(this);
    
       
    /*Highlight Adaptation */
      this.changeStyle = this.changeStyle.bind(this);
       this.unHighlight = this.unHighlight.bind(this);
       
       /*Suggestion Adaptation*/
        this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
        this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
      
       /*Automation Adaptation*/
      this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
      this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
       
   }
    
/*Method for the Highlight Adaptation*/
    changeStyle(){
         if(!this.state.adaptationVisited["Status_Audience"]['highlight']){
            this.setState({
             highlight1:false,
            })
          }
    }

    unHighlight() {

         if(this.state.highlight) {
             this.setState({
                 highlight:false, 
             })
         }
     }

/*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        this.setState({
             audience:'custom'
        },()=> this.post())  
    } 
    
  /*Methods for the Automation Adaptation*/
   onClickOk_Auto() {
       
        this.setState({
            displayAutomationPopup:false,
            audience:'custom'
        }, () => this.post())
    }
    
   onClickUndo_Auto(){
    
       this.setState({
                displayAutomationPopup:false,
                automation:false,
                audience:'public'
            })
    }    
    
    
  onClickPhoto(photo) {
    this.setState({photo: photo, renderUploadPopup: false});
  }

    
   post() {
       var event = {
                 action: 'Post Created',
                 context: 'From NewsFeed',
                 name: 'Alex Doe'
             };

             if (this.state.value === '' && this.state.photo === '') {
                 return null;
             }

     var posts = JSON.parse(localStorage.getItem('posts'));
       
     var post = {name: 'Alex Doe',
                 img: './assets/users/alex_profile_img.jpg',
                 content: this.state.value,
                 photo: this.state.photo,
                 key: posts.length,
                 comments: [],
                 audience: this.state.audience,
                 time: "Just now",
                 new: true};

    console.log(this.state.audience);
     if (!["public", "friends", "friends_expect", "only_me", "specific_friends"].includes(this.state.audience)) {
         let used = JSON.parse(localStorage.featuresUsed);
         used.custom_lists.post_custom = true;
         localStorage.setItem("featuresUsed", JSON.stringify(used));
     }

     if (this.props.forTimeline && this.props.name != "Alex Doe") post.target_friend = this.props.name;
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     this.props.postarea.update();
       
    registerEvent(`Created a new Post: ID ${posts.length}`," it reads: "+this.state.value+"  and or posted a Photo"+this.state.photo, (this.props.forTimeline?"Timeline":"NewsFeed"));
     this.setState({value: '', photo: '', renderUploadPopup: false});
   }
    
   onClick() {
       
        if(this.state.automation && this.state.value !== ""){
            this.setState({
                displayAutomationPopup:true,
                audience:'custom'
              })
            
        }else if(this.state.suggestion && this.state.value !== ""){
              this.setState({
                displaySuggestionPopup:true
              })
            
        } else{
            this.post();  
        }
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }
    
 
   onChangeAudience(audience) {
      this.setState({audience: audience});
   }

   render() {
     var uploadPopup = <UploadPopup
       onClickPhoto={this.onClickPhoto}
       destroy={() => {this.setState({renderUploadPopup: false})}} />;

      var photo = (this.state.photo) ?
        <img src={this.state.photo}
          style={{width: 60, height: 60}} />
        : null;
      
      var currentFriendList = getCurrentFriendLists();
      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'> 
              <textarea rows='6' placeholder={this.props.forTimeline && this.props.name != "Alex Doe"? `Write something to ${this.props.name.split(" ")[0]}`: "What's on your mind, Alex?"} value={this.state.value} onChange={this.onChange} />
              {photo}
              <hr />
               <div id='actions'>
                  <Button type="confirm" onClick={this.onClick}>Post</Button>
                  <Button type="cancel" onClick={() => {this.setState({renderUploadPopup: true})}}>Photo/Video</Button>
                  <AudienceMenu onChange={this.onChangeAudience} className="new-post-menu"
                    options={["public", "friends", "friends_except", "only_me"].concat(currentFriendList)}
                    //more={["specific_friends", "see_all"]}
                    //see_all={currentFriendList}
                    title="Who should see this?" 
                    highlight={this.state.highlight1 && this.state.highlight?highLight:No_highLight}
                    removeHighlightOnClick={this.changeStyle}
                    unHighlight = {this.unHighlight}
                    adapt = {this.state.highlight}
                    context={this.state.context} />
               </div>
               {this.state.renderUploadPopup ? uploadPopup : null}
            </div>
            
            {/*The Automation Adaptation Popup*/ 
                this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}
                />
            }
               
              {  /*The Suggestion Adaptation*/
                this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                }
               
         </div>);
   }
}

export default NewPostArea;
