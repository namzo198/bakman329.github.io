import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts, getProfilePic, audienceText,getParsed,saveVisitedAdaptation, namesToLinks,namesTagged,AddfriendList,nameToLink,followUser} from '../utilities.js'
import {highLight,highLightExtended,No_highLight } from '../adaptations/Highlight.js';
import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Menu from './Menu.jsx'
import Popup from './Popup.jsx'
import ContactInfoSuggestion from './profile/settings/contactDisplays/ContactInfoSuggestion.jsx'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import Automation from '../adaptations/Automation.jsx'
import AutomationBoilerplate from '../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../adaptations/Suggestion/SuggestionBoilerplate.jsx'

import {HighlightBoilerplate} from '../adaptations/Highlight/HighlightBoilerplate.jsx';
import classNames from 'classnames'
import ProfileLink from './ProfileLink.jsx'
import FriendSubscription from './profile/FriendSubscription.jsx';
import VisibilitySensor from "react-visibility-sensor";


//.high1

//TODO: Need to work on adaptation rendering lifecycle

class Post extends React.Component {
  constructor(props) {
    super(props);

    var posts = JSON.parse(localStorage.getItem('posts'));
    var hidden = false;
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        if (post.hidden && !this.props.forTimeline) {
          //hidden = true;
        }
        return true;
      }
    });

    let render = (this.props.render !== undefined) ? (this.props.render) : true;
    let adaptations = getParsed('adaptations');
    let adaptationVisited = getParsed('visited');
   
      
    this.state = {
      render: render && !hidden,
      name: '',
      context: 'From NewsFeed',
      action: '',
      value: '',
      showPostWhenHidden: false,
      renderSuggestion:false,
      hidden: hidden,
      unfollow:false, 
      unfollowedName:"",    
      tagRemoved: this.props.tagRemoved,
      displayContactInfoSuggestion:true,
      adaptations: adaptations,
      adaptationVisited: adaptationVisited,
        
      //Scroll Position and Show
        onScrollShowTagSuggestion:false,
        onScrollShowHideSuggestion:false,
        onscrollShowDeleteSuggestion:false,
        //scrollPos:0,
        
      //Highlight Adaptation
      hideHighlight1: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? true:false,
      untag_Highlight:!adaptationVisited["Untag_Post"]["highlight"] && (adaptations["untag_Post"] == "high")? true:false,
      delete_Highlight:!adaptationVisited["Delete_Post"]["highlight"] && (adaptations["delete_Post"] == "high")? true:false,
      //highlight: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? "high":null,
        
     //Hide Suggestion Adaptation
       hidesuggestion: !adaptationVisited ["Hide_Post"]["suggestion"]&& (adaptations["hide_Post"] === "sugst"),
       untag_Suggestion:!adaptationVisited ["Untag_Post"]["suggestion"]&& (adaptations["untag_Post"] === "sugst"),
       delete_Suggestion:!adaptationVisited["Delete_Post"]["suggestion"] && (adaptations['delete_Post'] === "sugst"),
       displayHideSuggestionPopup:true,
       displayUntagSuggestionPopup:true,
       unsubcribe_displaySuggestionPopup:true,   
       categorize_displaySuggestionPopup:true,
       untag_label_Sugst:"Hi Alex - You’ve been tagged in this post by Loren Payton. Would you like to untag yourself from this post?",
       label_Sugst:"Hi Alex - Would you want to hide this Post that shows that you just updated your profile picture from your Timeline. It may still appear in other places on FriendBook.",
    
      //Hide Automation Adaptation
      hideAutomation:!adaptationVisited ["Hide_Post"]["automation"]&& (adaptations["hide_Post"] === "auto"),
      untag_Automation:!adaptationVisited ["Untag_Post"]["automation"]&& (adaptations["untag_Post"] === "auto"),
      delete_Automation: !adaptationVisited["Delete_Post"]["automation"] && (adaptations["delete_Post"] === "auto"),
      action:"Hide_Post, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation) ",
        
       action_tag:"Untag_Post,Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)",
        
     //Context
      context_tag:"Untag_Post",
      context:"Hide_Post",
      untag_Context:"Untag_Post",
      displayHideAutomationPopup:true,
      displayUnTagAutomationPopup:true,
      label_Auto: "The post about your “updated profile picture” was automatically hidden from your Timeline.",
      untag_label_Auto:"A tag of you was automatically removed from this post.",

    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
    this.onClickRemoveTag = this.onClickRemoveTag.bind(this);
    this.onClickUnfollow = this.onClickUnfollow.bind(this);
    this.onClickUndo = this.onClickUndo.bind(this);
    this.onClickAutoOk = this.onClickAutoOk.bind(this);
    this.onDisplayContactInfoSuggestion = this.onDisplayContactInfoSuggestion.bind(this);
    this.show = this.show.bind(this);
      
     /*Suggestion Adaptation*/
        this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
        this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
        this.onClickUntag_DestroySuggestion = this.onClickUntag_DestroySuggestion.bind(this);
        this.onClickUntag_OKSuggestion = this.onClickUntag_OKSuggestion.bind(this);
       
      /* Unsubscribe Friend Suggestion Adaptation */
      
        this.onClickDestroyUnsubscribeSuggestion = this.onClickDestroyUnsubscribeSuggestion.bind(this);
        this.onClickOK_UnsubscribeSuggestion = this.onClickOK_UnsubscribeSuggestion.bind(this);
      
      /* Categorize Friend Suggestion Adaptation */
      
        this.onClickDestroyCategorizeSuggestion = this.onClickDestroyCategorizeSuggestion.bind(this);
        this.onClickOK_CategorizeSuggestion = this.onClickOK_CategorizeSuggestion.bind(this);
      
      
    /*Automation Adaptation */
      this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
      this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      this.onClickUntag_Ok_Auto = this.onClickUntag_Ok_Auto.bind(this);
      this.onClickUntag_Undo_Auto = this.onClickUntag_Undo_Auto.bind(this);
      
    /*Handle Scroll*/
      this.onChangeVisible = this.onChangeVisible.bind(this);
     
  }

   onChangeVisible(isVisible, postIndex) {
        
      //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
       
         if(postIndex === 27){
            this.setState({
                   onScrollShowTagSuggestion:isVisible,
               })
         }
       
        if(postIndex === 28) {
            this.setState({
             onScrollShowHideSuggestion:isVisible,
            })
        }
       
        if(postIndex === 2) {
            this.setState({
             onscrollShowDeleteSuggestion:isVisible
            })
        }
        
    }
    

    
  componentDidMount() {
    // Set a time on when to display the Suggestion.
    if (!this.state.hidden) {
      this.timerID = setTimeout(() => this.show(), 2000);
    }
     //console.log("Component mounted");
     //window.addEventListener('scroll', this.handleScroll,true); 
  }
    
    
   componentWillUnmount(){
       clearInterval(this.timerID)
       //console.log("Component removed");
      // window.removeEventListener("scroll", this.handleScroll,true);
   }
    
 

 /*Methods for the Hide Automation Adapatation*/
    logHide() {
         //console.log("In hiding");
        var posts = JSON.parse(localStorage.getItem('posts'));
        posts.some((post, index, array) => {
          if (post.key == 19 ) {
            posts[index].hidden = true;
            localStorage.setItem('posts', JSON.stringify(posts));
            this.setState({hidden: true});
            return true;
          }
        });
    }
    
    
    /*Methods for the Categorizing Suggestion Adaptation*/
    
    onClickDestroyCategorizeSuggestion() {
        
        this.setState({
           categorize_displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_CategorizeSuggestion(){
    
        this.setState({
            categorize_displaySuggestionPopup:false,
        })
        
        AddfriendList();
        //this.props.updateSubscribe();
    } 
    
    
     /*Methods for the Unsubscribing Suggestion Adaptation*/
    onClickDestroyUnsubscribeSuggestion() {
        this.setState({
           unsubcribe_displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_UnsubscribeSuggestion(){
        
        
        this.setState({
            unsubcribe_displaySuggestionPopup:false,
        })
        
        this.props.updateSubscribe();
        
        
       
    } 
    
    //For Hiding
    onClickOk_Auto() {
        this.setState({
            displayHideAutomationPopup:false
        })
        
        this.logHide();
    }
    
    //For Untagging
   onClickUntag_Ok_Auto() {
        
        this.setState({
             displayUnTagAutomationPopup:false
        })  
        
        this.onClickRemoveTag();
    }
    

    //For Hiding
    onClickUndo_Auto(){
    
       this.setState({
                displayHideAutomationPopup:false
            })
    }  
    
    //For Untagging
    onClickUntag_Undo_Auto() {
        
        this.setState({
             displayUnTagAutomationPopup:false,
             tagRemoved:false,
             untag_Automation:false,

        })  
        
    }
    
    
  /*Methods for the Suggestion Adaptation*/
    //For Hiding
    onClickDestroySuggestion() {
        
        this.setState({
            displayHideSuggestionPopup:false
        })  
        
    }
     
    //For Untagging Suggestion
     onClickUntag_DestroySuggestion() {
        
        this.setState({
           displayUntagSuggestionPopup:false
        })  
        
    }
    
    //For Hiding
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        this.setState({
            displayHideSuggestionPopup:false
        })
        
        this.logHide();
    }
    
    
    //For Untagging
    onClickUntag_OKSuggestion() {
        
        this.setState({
             displayUntagSuggestionPopup:false
        })
        
        this.onClickRemoveTag();
    }
    
     visitedAdaptation(feature,name){
     saveVisitedAdaptation(feature,name)
   }
    
    
    
    //Dismount the Suggestion for Contact Info in timeline
    onDisplayContactInfoSuggestion() {
       //console.log("The contactInfo suggestion has been closed")
        
        this.setState({displayContactInfoSuggestion: false});
         //this.setState({displayContactInfoSuggestion:false,})
    }
  // Show the Suggestion
  show() {
    this.setState({
      renderSuggestion:true
    });
  }

  onClickDelete() {
      var event = {
        render: false,
        action: 'Deleted post '+this.props.index,
        context: "Newsfeed",
        name: this.props.name + '\'s Post'
      };

        let used = JSON.parse(localStorage.featuresUsed);
        used.posts.delete = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));

      this.setState(event);
      var posts = JSON.parse(localStorage.getItem('posts'));
      posts.some((post, index, array) => {
        if (post.key == this.props.index) {
          posts.splice(index, 1);
          return true;
        }
      });
      localStorage.setItem('posts', JSON.stringify(posts));
      indexPosts();
    
      //if the highlighted button has not been visited and there is a highlight adaptation
     if(!this.state.adaptationVisited["Delete_Post"]["highlight"] && this.state.adaptations['delete_Post'] === "high"){
         
       this.visitedAdaptation("Delete_Post","highlight");
         
     }
      return event;
  }

  onClickShare() {
      var event = {
        action: 'Shared',
        context: this.state.context,
        name: this.props.name + '\'s Post'
      };

      var posts = JSON.parse(localStorage.getItem('posts'));
      var post = {name: 'Alex Doe',
                  original_poster: this.props.name,
                  content: this.props.children,
                  photo:this.props.photo,
                  time:"Just now",
                  comments: [],
                  key: posts.length};
      localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
      indexPosts();
      this.props.update();
      //PostArea.update;

      return event;
  }

  onClickLike() {
    var posts = getParsed('posts');
    var new_state = false;
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        new_state = !post.liked;
        return true;
      }
    });

    var event = {
      action: ((new_state) ? 'Liked' : 'Unliked'),
      context: this.state.context,
      name: this.props.name + '\'s Post'
    }

    var posts = getParsed('posts');
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        post.liked = new_state;
        return true;
      }
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    indexPosts();
    
    this.props.update();
    //PostArea.update();
    
      
      //if the highlighted button has not been visited and there is a highlight adaptation
     if(!this.state.adaptationVisited["LikePost"]["highlight"] && this.state.adaptations['liketimeline'] === "high"){
         
       this.visitedAdaptation("LikePost","highlight");
         
     }

    return event;
  }

  onClickComment() {
    if (this.new_comment_area) {
      this.new_comment_area.focus();
    }
  }



 onClickUnfollow(name) {
   
     this.setState({
         unfollow:true,
         unfollowedName: name,
     }, ()=> this.props.hideAllPosts(name))
 
 }
    
  onClickHide() {
      
      //console.log("On hide "+element)
    // TODO: Add confirmation popup and undo button
    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        posts[index].hidden = true;
        localStorage.setItem('posts', JSON.stringify(posts));
        this.setState({hidden: true});
        return true;
      }
    });

    let used = JSON.parse(localStorage.featuresUsed);
    used.posts.hide = true;
    localStorage.setItem("featuresUsed", JSON.stringify(used));
      
    if(!this.state.adaptationVisited["Hide_Post"]['highlight'] && this.state.hideHighlight1){
        
        this.setState({
            hideHighlight1:false,
        })
        
        HighlightBoilerplate(this.state.context);
    }
  }

  // TODO: Consider adding undo based on what FriendBook does
  onClickRemoveTag() {
    let used = JSON.parse(localStorage.featuresUsed);
    used.untag.self = true;
    localStorage.setItem("featuresUsed", JSON.stringify(used));
    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        posts[index].tagRemoved = true;
        localStorage.setItem('posts', JSON.stringify(posts));
        this.setState({tagRemoved: true});
        return true;
      }
    });
      
     if(!this.state.adaptationVisited["Untag_Post"]['highlight'] && this.state.untag_Highlight){
        
        this.setState({
            untag_Highlight:false,
        })
        
        HighlightBoilerplate(this.state.context_tag);
    }
  }

  actions() {
    //let adaptations = getParsed('adaptations');
    //let adaptationVisited = getParsed("visited");
      
    var posts = getParsed('posts');
      
    var liked = false;
      
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        liked = post.liked;
        return true;
      }
    });

    var like_text = ((liked) ? 'Unlike' : 'Like')
    
   // if (this.props.name == 'Alex Doe') {
      // console.log("The delete button adaptation is", adaptMethod.Delete_Post)
      // Keep an array where I specify index and just loop 
        
      return(
    <div id='actions'>
           
            <div className= "icon_actions like_icon"> <img src="/assets/like-icon.png"/> <Button onClick={this.onClickLike}>{like_text}</Button> </div>
            
            <div className= "icon_actions comment_icon"> <img src="/assets/comment-icon.png"/> <Button onClick={this.onClickComment}>Comment</Button> </div>
            
            <div className= "icon_actions remove_icon"> <img src="/assets/share-icon.png"/> <Button onClick={this.onClickShare}>Share</Button> </div>
    
               {/* Transfer to behind menu.
               <Button href='javascript:void(0);' onClick={this.onClickDelete} adapt={!this.state.adaptationVisited["Delete_Post"]["highlight"] && this.props.index === 6?this.state.adaptations['delete_Post']:""}>Delete</Button>*/
              }
        </div>);
   // }
  /*  else {
      return(
        <div id='actions'>
          <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={this.state.adaptations['liketimeline']}>{like_text}</Button>
          <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
          <Button href='javascript:void(0);' onClick={this.onClickShare}>Share</Button>
        </div>);
    }*/
  }

  onClickUndo(){
    var event = {
      render: true,
      action: 'Undo Delete Post',
      context: this.state.context,
      name: this.props.name + '\'s Post',
      showPostWhenHidden: true
    };
    this.setState(event);
    
    this.visitedAdaptation("Delete_Post","automation");
    return event;
   }
    
    onClickAutoOk(){
        var event = {
      render: false,
      action: 'Ok With Automatic Deletion of Post',
      context: this.state.context,
      name: this.props.name + '\'s Post',
      showPostWhenHidden: true
    };
    this.setState(event);
    this.visitedAdaptation("Delete_Post","automation");
        
    return event; 
    }

  renderPost(comments,post_title) {

    if (this.state.delete_Automation && !this.state.showPostWhenHidden && this.props.index === 2) {
      return (
              
              <Automation undoButton="Undo" okButton="Ok" onOkClick={this.onClickAutoOk} label="This post about  Mexican's going back to their country was automatically deleted" onUndoClick={this.onClickUndo} />
             
      );
    } else {
      // Suggestion adaptation for the delete method
      var Suggestion_Popup;
      if (this.state.delete_Suggestion && this.state.onscrollShowDeleteSuggestion) {
        {/*TO DO: Delete post on click of'OK' and record edb event*/}

        var Suggestion_Popup=(
          <SuggestionPopup title="Suggestion" okay={()=>{
              var event={
                render:false,
                action: 'Followed and agreed with Suggestion',
                context: this.state.context,
                name: this.props.name+'\'s Post: '+this.props.children,
                renderSuggestion:false
              };
              this.setState(event);
                    
              //if the suggestion has not been visited/engaged with yet
              this.visitedAdaptation("Delete_Post","suggestion");
              return event;
            }}

            destroy={()=>{
              var event={
                render:true,
                action:'Rather Not follow the Suggestion',
                context: this.state.context,
                name: this.props.name+'\'s Post: '+this.props.children,
                renderSuggestion:false
              };
              this.setState(event);
            
              //if the suggestion has not been visited/engaged with yet
              this.visitedAdaptation("Delete_Post","suggestion");
              
              return event;
            }}>
                
                
            <label>
                {/*this.props.name.split(" ")[0]*/} Hi Alex - Would you like to delete this post that states "<strong>{this.props.children} </strong>" It’s been flagged as a post that amounts to hate speech.<a href="https://www.facebook.com/communitystandards/hate_speech"> Learn More</a> 
            </label>
          </SuggestionPopup>);
      }

      // TODO: Fix audience text for specific friends etc.
      return(
        <div>
          <div id='post-info'>
            <img id='post-pic' src={getProfilePic(this.props.name)} />
            <div id='post-text'>
              <div id='post-name'>{post_title}</div>
              <p id='post-time'>{this.props.time}</p>
              {" · "}
              <p style={{display: "inline"}}>{audienceText(this.props.audience)}</p>
            </div>
            
           {this.props.forTimeline && this.props.name != "Alex Doe" ? null:
                <Menu icon={this.state.hideHighlight1 && this.props.index === 28 || this.state.untag_Highlight && this.props.index === 27||this.state.delete_Highlight && this.props.index === 2 ?'horiz high1':'horiz'}>


                  <div className={this.state.hideHighlight1 && this.props.index === 28?"high1":null}><Button onClick={ this.onClickHide}>{this.props.index === 28?"Hide from Timeline": "Hide post"}</Button></div>

                  {(!this.state.tagRemoved && this.props.children.toLocaleLowerCase().includes("alex doe"))
                      ? <div className={this.state.untag_Highlight && this.props.index === 27?"high1":null}><Button onClick={this.onClickRemoveTag}>Remove tag</Button></div> : null}

                  {(this.props.name != "Alex Doe") ? <Button onClick={ () => this.onClickUnfollow(this.props.name)}>Unfollow {this.props.name}</Button> : null}

                   {(this.props.name === "Alex Doe") ? <div className={this.state.delete_Highlight && this.props.index === 2?"high1":null}> <Button href='javascript:void(0);' onClick={this.onClickDelete}>Delete</Button></div>:null}

                </Menu> 
           }                         
          </div>
          
          <VisibilitySensor onChange={(isVisible) => this.onChangeVisible (isVisible,this.props.index)} partialVisibility offset={{top:50,bottom:50}} >
              {<p>{namesToLinks(this.props.children, this.state.tagRemoved)}</p>}
          </VisibilitySensor>
          
          {this.props.photo ? <img src={this.props.photo} width="100%" height="100%"></img> : null}
          
              
                 { /*The Untag Automation Adaptation Popup*/ 
                    this.state.untag_Automation && this.state. displayUnTagAutomationPopup && this.props.index == 27 &&!this.state.tagRemoved && <AutomationBoilerplate action = {this.state.action_tag} context = {this.state.context_tag} label={this.state.untag_label_Auto} onClickOK_Auto={this.onClickUntag_Ok_Auto } onClickUnDo_Auto = {this.onClickUntag_Undo_Auto}
                />}
             
          
          <hr />
          {this.actions()}
          <hr />
          
          
          {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name}>{comment.content}</Comment>)}
          <NewCommentArea type='post' index={this.props.index} post={this} />

            
         
        
        {this.state.renderSuggestion ? Suggestion_Popup : null}
          
           
        { /*The Hide Suggestion Adaptation*/
            this.state.hidesuggestion && this.state.displayHideSuggestionPopup && this.state.onScrollShowHideSuggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
        }   
           
        
               
         {/*The Untag Suggestion Adaptation*/
          this.state.untag_Suggestion && this.state.displayUntagSuggestionPopup &&  this.state.onScrollShowTagSuggestion && <SuggestionBoilerplate action={this.state.action_tag}  context={this.state.context_tag} label={this.state.untag_label_Sugst} agree={this.onClickUntag_OKSuggestion} destroy = {this.onClickUntag_DestroySuggestion}/>}
        
            
        </div>);
    }
  }

    
  render() {
      
    // console.log("The state for hidden is "+this.state.hidden);
      
    if (!this.state.render) {
     return null;
   }

    if (this.state.hidden) {
      // TODO: Make this say newsfeed when it is newsfeed
        //|| This post is now hidden from your Timeline
      return (
        <div id='post' className='hidden'>
          <div id='post-content'>
           <i className="hidePosts"></i>
           
           {this.props.forTimeline? 
              " This post is now hidden from your Timeline": 
              <span className="hide_title_1">Post hidden</span>} 
            
           <span className={this.props.forTimeline?"hideUndoButton_timeline":"hideUndoButton"}> <Button className="hideUndoButton" onClick={() => {
              this.setState({hidden: false});
              var posts = JSON.parse(localStorage.getItem('posts'));
              posts.some((post, index, array) => {
                if (post.key == this.props.index) {
                  posts[index].hidden = false;
                  localStorage.setItem('posts', JSON.stringify(posts));
                  return true;
                }
              });
                   }}>Undo</Button></span>
            <span id='hide-post-dismiss'>
              <Button onClick={() => this.setState({render: false})}>X</Button>
            </span>
            
              {!this.props.forTimeline? <div className="hide_title_2">
             You won't see this post in your News Feed.
            </div>: null}
          </div>
        </div>
      );
    } 
      
    if(this.state.unfollow) {
        let hideClass = classNames('hidePosts', 'allPosts')
        return (
          <div id='post' className='hidden'>
          <div id='post-content'>
           <i className={hideClass}></i>
            <span className="hide_title_1">All posts hidden</span>
            
            <span className="hideUndoButton"><Button  onClick={() => {
             
              
               followUser(this.state.unfollowedName);  
               this.setState({unfollow: false})
               this.props.update();  
                        
                var users  = JSON.parse(localStorage.getItem('users'))
                users.some((user,index,array) => {
                   if(user.name == this.state.unfollowedName){
                       users[index].follow = true,
                      localStorage.setItem('users', JSON.stringify(users));
                      return true;        
                   } 
                });
                
                //console.log(users);
             
            }}>Undo</Button></span>
            <span id='hide-post-dismiss'>
              <Button onClick={() => this.setState({render: false})}>X</Button>
            </span>
            
             <div className="hide_title_2">
            You won't see Posts from {this.state.unfollowedName} in your NewsFeed.</div> 
        
          </div>
          
          
        </div>
      );
         
    }  
    
    if (this.props.hidden && !this.props.forTimeline) {
         return null;
    }
    //http://localhost:8080/?session=a09eb84d555bb8d55510ef28a56a6f3d&hide_Post=auto
      
   
    /*Automation of Hiding Post */ 
    if(this.state.hideAutomation && this.state.displayHideAutomationPopup && this.props.index == 28) {
     
        return (
             <div id='post' className='hidden'>
              <div id='post-content'>
              {/*The Automation Adaptation Popup*/ 
                <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}
                />
               }
            </div>
        </div>
        )
    }
    
    


    //To indicate shared Post
    var post_title = [<ProfileLink name={this.props.name} key={0} />];
   
      if (this.props.original_poster) {
      post_title.push(' shared ');
      post_title.push(<ProfileLink name={this.props.original_poster} key={1} />);
      post_title.push('\'s post');
    }
      
    /*To indicate tagged Post*/
    if (!this.state.tagRemoved && !this.state.untag_Automation && this.props.children.includes("Alex Doe")  ){
        post_title.push(' is with');
        post_title.push(<ProfileLink name={"Alex Doe"} key={1}/>   );
    }
      
      /*To indicate updated profile picture */
      
      if (this.props.index == 28){
         post_title.push(' updated his profile picture ')
      }
     

    var posts = JSON.parse(localStorage.getItem('posts'));
    var comments = [];
    posts.some((post, index, array) => {
      if (!this.props.hidden && post.key == this.props.index) {
        comments = post.comments;
        return true;
      }
    });
    comments = (comments) ? comments : [];

    return(
        
      <div id='post'>
        <div id='post-content'> 
          {this.renderPost(comments,post_title)}
          
          {this.props.displayContactInfoSuggestion && this.state.displayContactInfoSuggestion && this.props.index === 0 && <ContactInfoSuggestion username = {this.props.name} destroy = {this.onDisplayContactInfoSuggestion}/>}
          
          {    /*These happen on the Timeline */
                
                /*The Unsubscribe Suggestion Adaptation*/
            (this.props.name == "Jack Scout") && this.props.displayUnsubscribeSuggestion && this.state.unsubcribe_displaySuggestionPopup && this.props.index === 1 && <SuggestionBoilerplate action={"Unsubscribe_Friend, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)"}  context={"Unsubscribe_Friend"} label={"Hi Alex - You are constantly hiding  Jack Scout’s posts. Do you want to unfollow Jack? You’ll still be friends with him but won’t see his posts in NewsFeed anymore."} agree ={this.onClickOK_UnsubscribeSuggestion} destroy = {this.onClickDestroyUnsubscribeSuggestion}/>
                  
           }
           
             {  /*The Categorize Suggestion Adaptation*/
             (this.props.name == "Sasha Riley") && this.props.displayCategorizeSuggestion&& this.state.categorize_displaySuggestionPopup && this.props.index === 21 && <SuggestionBoilerplate action={"Categorize_Friend, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)"}  context={"Categorize_Friend"} label={"Hi Alex - Would you like to add Sasha Riley  to the “Family” friend list as you seem to all work at the same place. "} agree ={this.onClickOK_CategorizeSuggestion} destroy = {this.onClickDestroyCategorizeSuggestion}/>
                  
           }
          
         
          
          </div>
    
        
      </div>);
  }
}

export default Post;
