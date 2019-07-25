import React from 'react'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import AudienceMenu from './AudienceMenu.jsx'
import PostArea from './PostArea.jsx'
import UploadPopup from './UploadPopup.jsx'
import{addToLocalStorageObject,getParsed,saveVisitedAdaptation,getCurrentFriendLists} from '../utilities.js';
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
                    highlight: !adaptationVisited["Status_Audience"]["highlight"] && (adaptation["status_Audience"] == "high")? "high":null,
                    automation:!adaptationVisited ["Status_Audience"]["automation"]&& (adaptation["status_Audience"] === "auto"),
                    displayAutomationPopup:false,
                    displaySuggestionPopup:false,
                    action:"Status_Audience, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)",
                    context:"Status_Audience",
                    label_Sugst:" Hi Alex - Sorry to interrupt. You haven't changed who can see your posts lately, so we just wanted to make sure you are sharing this post with the right audience. (Your current setting is Public, though you can change this whenever you post).  Would you want to share this post with \"Friends\"",
                    label_Auto: "This post's audience is automatically set to be shared with \"Friends\"",
                    
                   };
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onClickPhoto = this.onClickPhoto.bind(this);
      this.onChangeAudience = this.onChangeAudience.bind(this);
    
       
    /*Highlight Adaptation */
      this.changeStyle = this.changeStyle.bind(this);
       
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

/*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        
        this.setState({
            audience:'Friends'
        })
        
        this.post();
    } 
    
  /*Methods for the Automation Adaptation*/
   onClickOk_Auto() {
       
        this.setState({
            displayAutomationPopup:false,
        })
       
       
       this.post()
    }
    
   onClickUndo_Auto(){
    
       this.setState({
                displayAutomationPopup:false
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
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     this.props.postarea.update();
     this.setState({value: '', photo: '', renderUploadPopup: false});

     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     this.props.postarea.update();
     this.setState({value: '', photo: '', renderUploadPopup: false});
     return event;
   }
    
   onClick() {
       
        if(this.state.automation){
            this.setState({
                displayAutomationPopup:true,
                audience:'friends'
              })
            
        }else if(this.state.suggestion){
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
              <textarea rows='6' placeholder="What's on your mind, Alex?" value={this.state.value} onChange={this.onChange} />
              {photo}
              <hr />
               <div id='actions'>
                  <Button type="confirm" onClick={this.onClick}>Post</Button>
                  <Button type="cancel" onClick={() => {this.setState({renderUploadPopup: true})}}>Photo/Video</Button>
                  <AudienceMenu onChange={this.onChangeAudience} className="new-post-menu"
                    options={["public", "friends", "friends_except", "only_me", "more"]}
                    more={["specific_friends", "see_all"]}
                    see_all={currentFriendList}
                    title="Who should see this?" 
                    highlight={this.state.highlight1 && this.state.highlight?highLight:No_highLight}
                    removeHighlightOnClick={this.changeStyle}
                    adapt = {this.state.highlight}
                    context={this.state.context} />
               </div>
               {this.state.renderUploadPopup ? uploadPopup : null}
            </div>
            
            {/*The Automation Adaptation Popup*/ 
                this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}
                />
            }
               
              {   /*The Suggestion Adaptation*/
                        this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                   }
               
         </div>);
   }
}

export default NewPostArea;