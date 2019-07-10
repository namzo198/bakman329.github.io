import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts, getProfilePic, audienceText,getParsed,saveVisitedAdaptation, namesToLinks,namesTagged} from '../utilities.js'
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

//.high1

//TODO: Need to work adaptation rendering lifecycle

class Post extends React.Component {
  constructor(props) {
    super(props);

    var posts = JSON.parse(localStorage.getItem('posts'));
    var hidden = false;
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        if (post.hidden) {
          hidden = true;
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
      tagRemoved: this.props.tagRemoved,
      displayContactInfoSuggestion:true,
      adaptations: adaptations,
      adaptationVisited: adaptationVisited,
        
      //Highlight Adaptation
      hideHighlight1: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? true:false,
      untag_Higlight:!adaptationVisited["Untag_Post"]["highlight"] && (adaptations["untag_Post"] == "high")? true:false,
      //highlight: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? "high":null,
        
     //Hide Suggestion Adaptation
       hidesuggestion: !adaptationVisited ["Hide_Post"]["suggestion"]&& (adaptations["hide_Post"] === "sugst"),
       untag_Suggestion:!adaptationVisited ["Untag_Post"]["suggestion"]&& (adaptations["untag_Post"] === "sugst"),
       displayHideSuggestionPopup:true,
       displayUntagSuggestionPopup:true,
       untag_label_Sugst:"Hi Alex, Kyle Parker tagged you in a Post \"I am hanging out tonight with Alex Doe\". Would you like to untag yourself from it?",
       label_Sugst:"Hi Alex - Sorry to interrupt. Would you want to hide the Post that reads as \"To all those who treat \".... ",
    
      //Hide Automation Adaptation
      hideAutomation:!adaptationVisited ["Hide_Post"]["automation"]&& (adaptations["hide_Post"] === "auto"),
      untag_Automation:!adaptationVisited ["Untag_Post"]["automation"]&& (adaptations["untag_Post"] === "auto"),
      action:"Hide_Post, Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation) ",
        
       action_tag:"Untag_Post,Check to see if the suggested audience for the post was followed/not followed (for Undo_Automation)",
        
     //Context
      context_tag:"Untag_Post",
      context:"Hide_Post",
      untag_Context:"Untag_Post",
      displayHideAutomationPopup:true,
      displayUnTagAutomationPopup:true,
      label_Auto: "This post was automatically hidden",
      untag_label_Auto:"A tag of you was automatically removed from this post.",
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
    this.onClickRemoveTag = this.onClickRemoveTag.bind(this);
    this.onClickUndo = this.onClickUndo.bind(this);
    this.onClickAutoOk = this.onClickAutoOk.bind(this);
    this.onDisplayContactInfoSuggestion = this.onDisplayContactInfoSuggestion.bind(this);
    this.show = this.show.bind(this);
      
     /*Suggestion Adaptation*/
        this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
        this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
        this.onClickUntag_DestroySuggestion = this.onClickUntag_DestroySuggestion.bind(this);
        this.onClickUntag_OKSuggestion = this.onClickUntag_OKSuggestion.bind(this);
      
    /*Automation Adaptation */
      this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
      this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
      this.onClickUntag_Ok_Auto = this.onClickUntag_Ok_Auto.bind(this);
      this.onClickUntag_Undo_Auto = this.onClickUntag_Undo_Auto.bind(this);
  }

  componentDidMount() {
    // Set a time on when to display the Suggestion.
    if (!this.state.hidden) {
      this.timerID = setTimeout(() => this.show(), 2000);
    }
  }
    
    
   componentWillUnmount(){
       clearInterval(this.timerID)
   }
    

 /*Methods for the Hide Automation Adapatation*/
    logHide() {
         //console.log("In hiding");
        var posts = JSON.parse(localStorage.getItem('posts'));
        posts.some((post, index, array) => {
          if (post.key == 19 ) {
            posts[index].hidden = true;
            localStorage.setItem('posts', JSON.stringify(posts));
            this.setState({render: false});
            return true;
          }
        });
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
             displayUnTagAutomationPopup:false
        })  
        
    }
    
    
  /*Methods for the Suggestion Adaptation*/
    //For Hiding
    onClickDestroySuggestion() {
        
        this.setState({
            displayHideSuggestionPopup:false
        })  
        
    }
     
    //For Untagging
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
     if(!this.state.adaptationVisited["DeletePost"]["highlight"] && this.state.adaptations['deletetimeline'] === "high"){
         
       this.visitedAdaptation("DeletePost","highlight");
         
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


    
  onClickHide() {
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

  // TODO: Consider adding undo based on what Facebook does
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
      
     if(!this.state.adaptationVisited["Untag_Post"]['highlight'] && this.state.untag_Higlight){
        
        this.setState({
            untag_Higlight:false,
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
    
    if (this.props.name == 'Alex Doe') {
      // console.log("The delete button adaptation is", adaptMethod.deletepost)
      // Keep an array where I specify index and just loop  
      return(
        <div id='actions'>
          <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={!this.state.adaptationVisited["LikePost"]["highlight"] && this.props.index === 3?this.state.adaptations['liketimeline']:""}>{like_text}</Button>
          <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
          <Button href='javascript:void(0);' onClick={this.onClickDelete} adapt={!this.state.adaptationVisited["DeletePost"]["highlight"] && this.props.index === 6?this.state.adaptations['deletetimeline']:""}>Delete</Button>
        </div>);
    }
    else {
      return(
        <div id='actions'>
          <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={this.state.adaptations['liketimeline']}>{like_text}</Button>
          <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
          <Button href='javascript:void(0);' onClick={this.onClickShare}>Share</Button>
        </div>);
    }
  }

  onClickUndo(){
    var event = {
      render: false,
      action: 'Undo Delete Post',
      context: this.state.context,
      name: this.props.name + '\'s Post',
      showPostWhenHidden: true
    };
    this.setState(event);
    
    this.visitedAdaptation("DeletePost","automation");
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
    this.visitedAdaptation("DeletePost","automation");
        
    return event; 
    }

  renderPost(comments,post_title) {
    //let adaptations = getParsed('adaptations');
    //let adaptationVisited = getParsed("visited");
      
    if (!this.state.adaptationVisited["DeletePost"]["automation"] && this.state.adaptations['deletetimeline'] === 'auto' && !this.state.showPostWhenHidden && this.props.index === 9) {
      return (
              
              <Automation undoButton="Undo" okButton="Ok" onOkClick={this.onClickAutoOk} label="This post was automatically deleted" onUndoClick={this.onClickUndo} />
             
      );
    }
    else {
      // Suggestion adaptation for the delete method
      var Suggestion_Popup;
      if (!this.state.adaptationVisited["DeletePost"]["suggestion"] && this.state.adaptations['deletetimeline'] === 'sugst' && this.props.index === 6) {
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
              this.visitedAdaptation("DeletePost","suggestion");
              return event;
            }}

            destroy={()=>{
              var event={
                render:false,
                action:'Rather Not follow the Suggestion',
                context: this.state.context,
                name: this.props.name+'\'s Post: '+this.props.children,
                renderSuggestion:false
              };
              this.setState(event);
            
              //if the suggestion has not been visited/engaged with yet
              this.visitedAdaptation("DeletePost","suggestion");
              
              return event;
            }}>
                
                
            <label>
                Hi {this.props.name.split(" ")[0]} - I think you should delete the post that states "<strong>{this.props.children} </strong>" This sounds like hate speech. Furthermore, did you know your current audience is set to <strong>{this.props.audience}</strong> meaning anyone on Fakebook can see this post.<a href="https://www.facebook.com/communitystandards/hate_speech"> Learn More</a> 
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
              <p id='post-time'>1 hr</p>
              {" · "}
              <p style={{display: "inline"}}>{audienceText(this.props.audience)}</p>
            </div>
           <Menu icon={this.state.hideHighlight1 && this.props.index === 19 || this.state.untag_Higlight && this.props.index === 21?'horiz high1':'horiz'}>
              <div className={this.state.hideHighlight1 && this.props.index === 19?"high1":null}><Button onClick={this.onClickHide}>Hide post</Button></div>
              
              {(!this.state.tagRemoved && this.props.children.toLocaleLowerCase().includes("alex doe"))
                  ? <div className={this.state.untag_Higlight && this.props.index === 21?"high1":null}><Button onClick={this.onClickRemoveTag}>Remove tag</Button></div> : null}
              {(this.props.name != "Alex Doe") ? <Button>Unfollow {this.props.name}</Button> : null}
              
            </Menu>                             
          </div>
          
          <p>{namesToLinks(this.props.children, this.state.tagRemoved)}</p>
          {this.props.photo ? <img src={this.props.photo} width="40px" height="40px"></img> : null}
          
              <div id='post-content'>
                { /*The Untag Automation Adaptation Popup*/ 
                    this.state.untag_Automation && this.state. displayUnTagAutomationPopup && this.props.index == 21 &&!this.state.tagRemoved && <AutomationBoilerplate action = {this.state.action_tag} context = {this.state.context_tag} label={this.state.untag_label_Auto} onClickOK_Auto={this.onClickUntag_Ok_Auto } onClickUnDo_Auto = {this.onClickUntag_Undo_Auto}
                />}
             </div>
          
          <hr />
          {this.actions()}
          <hr />
          
          
          {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name}>{comment.content}</Comment>)}
          <NewCommentArea type='post' index={this.props.index} post={this} />

            
         
        
        {this.state.renderSuggestion ? Suggestion_Popup : null}
          
           
        { /*The Hide Suggestion Adaptation*/
            this.state.hidesuggestion && this.state.displayHideSuggestionPopup && this.props.index == 19 && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
        }   
        
         {/*The Untag Suggestion Adaptation*/
          this.state.untag_Suggestion && this.state.displayUntagSuggestionPopup && this.props.index === 21 && <SuggestionBoilerplate action={this.state.action_tag}  context={this.state.context_tag} label={this.state.untag_label_Sugst} agree={this.onClickUntag_OKSuggestion} destroy = {this.onClickUntag_DestroySuggestion}/>}
            
            
        </div>);
    }
  }

  render() {
    if (!this.state.render) {
      return null;
    }

    if (this.state.hidden) {
      // TODO: Make this say newsfeed when it is newsfeed
      return (
        <div id='post' className='hidden'>
          <div id='post-content'>
            This post is now hidden from your timeline.
            {" "}
            <Button onClick={() => {
              this.setState({hidden: false});
              var posts = JSON.parse(localStorage.getItem('posts'));
              posts.some((post, index, array) => {
                if (post.key == this.props.index) {
                  posts[index].hidden = false;
                  localStorage.setItem('posts', JSON.stringify(posts));
                  return true;
                }
              });
            }}>Undo</Button>
            <span id='hide-post-dismiss'>
              <Button onClick={() => this.setState({render: false})}>X</Button>
            </span>
          </div>
        </div>
      );
    } 
    
    //http://localhost:8080/?session=a09eb84d555bb8d55510ef28a56a6f3d&hide_Post=auto
      
   
    /*Automation of Hiding Post */ 
    if(this.state.hideAutomation && this.state.displayHideAutomationPopup && this.props.index == 19) {
     
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
      
    /**To indicate tagged Post
    if(!this.props.tagRemoved && this.props.children.includes("Alex Doe")){
        post_title.push(' is with ');
        //post_title.push(namesTagged(this.props.children));
        //post_title.push(namesToLinks("Alex", this.state.tagRemoved));  
    }*/
     

    var posts = JSON.parse(localStorage.getItem('posts'));
    var comments = [];
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        comments = post.comments;
        return true;
      }
    });
    comments = (comments) ? comments : [];

    const Children = this.props.children
    //let adaptations = JSON.parse(localStorage.adaptations);
      
     
      
    return(
        
      <div id='post'>
     {/*console.log("In Component/Post file Props"+this.props.displayContactInfoSuggestion +"    State"+this.state.displayContactInfoSuggestion)*/}
      
       {!this.state.adaptationVisited["DeletePost"]["automation"] && this.state.adaptations['deletetimeline'] === 'auto'&& this.props.index === 9?
        <div id='except-warning'> 
          <p>{/*this.props.children*/}</p> 
          {this.renderPost(comments,post_title)}
         
          {this.props.displayContactInfoSuggestion && this.state.displayContactInfoSuggestion && this.props.index === 0 && <ContactInfoSuggestion username = {this.props.name.split(" ")[0]} destroy = {this.onDisplayContactInfoSuggestion} />}
          
        </div>:
        <div id='post-content'> 
          <p>{/*this.props.children*/}</p> 
          {this.renderPost(comments,post_title)}
          
          {this.props.displayContactInfoSuggestion && this.state.displayContactInfoSuggestion && this.props.index === 0 && <ContactInfoSuggestion username = {this.props.name} destroy = {this.onDisplayContactInfoSuggestion}/>}
          
          </div>
        }
        
      </div>);
  }
}

export default Post;
