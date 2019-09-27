import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts, getProfilePic, audienceText,getParsed,saveVisitedAdaptation, namesToLinks,namesTagged,AddfriendList,nameToLink,followUser,blockFriend,registerEvent} from '../utilities.js'
import {highLight,highLightExtended,No_highLight } from '../adaptations/Highlight.js';
import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Menu from './Menu.jsx'
import Popup from './Popup.jsx'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import Automation from '../adaptations/Automation.jsx'
import AutomationBoilerplate from '../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import BlockPopup from './profile/block_confirmations/BlockPopup.jsx'
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
      displayContactInfoSuggestion: true,
      displayBasicInfoSuggestion: ((this.props.displayContactInfoSuggestion && this.props.displayContactInfoSuggestion) ? false:true), 
      renderBlockPopup:false,
      adaptations: adaptations,
      adaptationVisited: adaptationVisited,
        
      //Scroll Position and Show
        onscrollShowTagSuggestion:false,
        onscrollShowHideSuggestion:false,
        onscrollShowDeleteSuggestion:false,
        onscrollShowBlockSuggestion:false,
        //scrollPos:0,
        
      //Highlight Adaptation
      hideHighlight1: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? true:false,
      untag_Highlight:!adaptationVisited["Untag_Post"]["highlight"] && (adaptations["untag_Post"] == "high")? true:false,
      delete_Highlight:!adaptationVisited["Delete_Post"]["highlight"] && (adaptations["delete_Post"] == "high")? true:false,
      //highlight: !adaptationVisited["Hide_Post"]["highlight"] && (adaptations["hide_Post"] == "high")? "high":null,
      block_Highlight: !adaptationVisited["Block_User"]["highlight"] && !adaptationVisited["Block_User"]["NewsFeed_highlight"] && (adaptations["block_User"] == "high")? true:false,
        
     //Suggestion Adaptation
        block_Suggestion: !adaptationVisited ["Block_User"]["suggestion"] && (adaptations["block_User"] === "sugst"),
       hidesuggestion: !adaptationVisited ["Hide_Post"]["suggestion"]&& (adaptations["hide_Post"] === "sugst"),
       untag_Suggestion:!adaptationVisited ["Untag_Post"]["suggestion"]&& (adaptations["untag_Post"] === "sugst"),
       delete_Suggestion:!adaptationVisited["Delete_Post"]["suggestion"] && (adaptations['delete_Post'] === "sugst"),
       displayBlockSuggestionPopup:true,
       displayHideSuggestionPopup:true,
       displayUntagSuggestionPopup:true,
       unsubcribe_displaySuggestionPopup:true,   
       categorize_displaySuggestionPopup:true,
       block_label_Sugst:"Hi Alex - Posts by Ira Siplan have repeatedly been flagged as abusive. Do you want to block Ira?",
       untag_label_Sugst:"Hi Alex - You’ve been tagged in this post by Loren Payton, which contains alcohol. Do you want to untag yourself from this post?",
       label_Sugst:"Hi Alex - Trevin Noushy has posted this message to your Timeline, which contains a reference to drug use. Do you want to hide this post from your Timeline? It may still appear in other places on FriendBook.",
    
      //Hide Automation Adaptation
      blockAutomation:!adaptationVisited ["Block_User"]["automation"]&& (adaptations["block_User"] === "auto"),
      hideAutomation:!adaptationVisited ["Hide_Post"]["automation"]&& (adaptations["hide_Post"] === "auto"),
      untag_Automation:!adaptationVisited ["Untag_Post"]["automation"]&& (adaptations["untag_Post"] === "auto"),
      delete_Automation: !adaptationVisited["Delete_Post"]["automation"] && (adaptations["delete_Post"] === "auto"),
      action:"Adapation was for Hide_Post -> hiding Post 42 ",
      action_tag:"Untag_Post_Adaptation -> untagging Post 27",
      action_block:"Adaptation was for Block_User -> Blocking Ira Siplan",
        
     //Context
      context_tag:"Untag_Post",
      context_block:"Block_User",    
      context:"Hide_Post",
      untag_Context:"Untag_Post",
      displayHideAutomationPopup:true,
      displayUnTagAutomationPopup:true,
      displayBlockAutomationPopup:true,
      label_Auto: "This post by Trevin Noushy was automatically hidden from your Timeline.",
      block_label_Auto: "This post by Ira Slipan is not visible because he has been automatically blocked.",  
      untag_label_Auto:"A tag of you was automatically removed from this post.",
      renderSharePopup: false

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
    this.show = this.show.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
      
     
    /*Suggestion Adaptation*/
    this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
    this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
    this.onClickUntag_DestroySuggestion = this.onClickUntag_DestroySuggestion.bind(this);
    this.onClickUntag_OKSuggestion = this.onClickUntag_OKSuggestion.bind(this);
    this.onClickBlock_DestroySuggestion = this.onClickBlock_DestroySuggestion.bind(this);
    this.onClickBlock_OKSuggestion = this.onClickBlock_OKSuggestion.bind(this); 
    this.onClickOK_ContactInfoSuggestion = this.onClickOK_ContactInfoSuggestion.bind(this);
    this.onDisplayContactInfoSuggestion = this.onDisplayContactInfoSuggestion.bind(this);
    this.onClickOK_BasicInfoSuggestion = this.onClickOK_BasicInfoSuggestion.bind(this);
    this.onDisplayBasicInfoSuggestion = this.onDisplayBasicInfoSuggestion.bind(this);
         
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
    this.onClickBlock_Ok_Auto = this.onClickBlock_Ok_Auto.bind(this);
    this.onClickBlock_Undo_Auto = this.onClickBlock_Undo_Auto.bind(this);
      

    /*Block Adaptation*/
    this.registerClick = this.registerClick.bind(this);
    this.agreeToBlock = this.agreeToBlock.bind(this);
    this.cancelBlock = this.cancelBlock.bind(this); 

    /*Handle Scroll*/
    this.onChangeVisible = this.onChangeVisible.bind(this);
     
  }


   onChangeVisible(isVisible, postIndex) {
        
      //console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
       
       //Tag Suggestion Adaptation
         if(postIndex === 27){
            this.setState({
                   onscrollShowTagSuggestion:isVisible,
               })
         }
       
       //Hide Suggestion Adaptation
        if(postIndex === 42) {
            this.setState({
             onscrollShowHideSuggestion:isVisible,
            })
        }
       
       //Delete Suggestion Adaptation
        if(postIndex === 2) {
            this.setState({
             onscrollShowDeleteSuggestion:isVisible
            })
        }
       
       //Block Suggestion Adaptation
       let adaptationVisited = getParsed('visited')
       
       if( (postIndex === 17 || postIndex === 24 || postIndex === 32 || postIndex === 36|| postIndex === 41) &&  (!adaptationVisited["Block_User"]["suggestion"])) {
           
           this.setState({
               onscrollShowBlockSuggestion:isVisible
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
   }
    
 
 /*Methods for the Block Adaptation*/
 
   registerClick() {
    
        if(this.state.block_Highlight) {   
               this.setState({
                  block_Highlight:false, 
               })
           saveVisitedAdaptation("Block_User","NewsFeed_highlight");
        }

        registerEvent('Clicked on '+this.props.name+"'\s profile link to visit their profile page", 'from post '+this.props.index,(this.props.forTimeline?"Timeline":"NewsFeed"));   
   }
    
   //Suggestion 
   onClickBlock_OKSuggestion() {
       this.setState({
           displayBlockSuggestionPopup:false,
           renderBlockPopup:true,
        })
   }    
    
   onClickBlock_DestroySuggestion() {
       
       this.setState({
           displayBlockSuggestionPopup:false,
        }) 
       
    }
    
    agreeToBlock(){
        
        blockFriend("ira_slipan", "Timeline Block");
        this.setState({
            renderBlockPopup:false, 
        })
    }
    
    cancelBlock(){
        this.setState({
            renderBlockPopup:false,
        })
    }
    
    //Automation
    onClickBlock_Ok_Auto() {
       
       blockFriend("ira_slipan", "Timeline Block");
        
        this.setState({
             displayBlockAutomationPopup:false
        })  
        
    }
    
    onClickBlock_Undo_Auto() {
        
        this.setState({
             displayBlockAutomationPopup:false
        })  
    
      this.props.update(); 
    }
    
 /*Methods for the Hide Automation Adaptation*/
    logHide() {
         var posts = JSON.parse(localStorage.getItem('posts'));
        posts.some((post, index, array) => {
          if (post.key == this.props.index) {
            posts[index].hidden = true;
            localStorage.setItem('posts', JSON.stringify(posts));
            this.setState({hidden:true});
            return true;
          }
        });

        let used = JSON.parse(localStorage.featuresUsed);
        used.posts.hide = true;
        localStorage.setItem("featuresUsed", JSON.stringify(used));
      
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
        }, ()=> this.onClickHide())
        
       
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
        },()=> this.onClickHide())

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
    
    /*Methods for the BasicInfo Suggestion Adaptation*/
    
     onClickOK_ContactInfoSuggestion() {
         
          this.setState({
           displayContactInfoSuggestion:false,
        })
         
         if(this.props.displayContactInfoSuggestion && this.props.displayContactInfoSuggestion) {
             
              this.setState({
                  displayBasicInfoSuggestion:true,
              })
         }
         
     }

    onDisplayContactInfoSuggestion() {
        this.setState({displayContactInfoSuggestion: false});
    }
    
     
    onClickOK_BasicInfoSuggestion() {
         
          this.setState({
           displayBasicInfoSuggestion:false,
        })
         
     }
    
    onDisplayBasicInfoSuggestion() { 
        this.setState({displayBasicInfoSuggestion: false});
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
        action: 'Deleted '+ this.props.name + '\'s',
        context: 'Post '+this.props.index,
        object :"Timeline",
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
     

      var posts = JSON.parse(localStorage.getItem('posts'));
      var post = {name: 'Alex Doe',
                  original_poster: this.props.name,
                  content: this.props.children,
                  photo:this.props.photo,
                  time:"Just now",
                  comments: [],
                  new: true,
                  key: posts.length};
      localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
      indexPosts();
      registerEvent('Clicked to Share ', this.props.name +"'\s Post "+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
      this.setState({renderSharePopup: true});
      this.props.update();
      
   
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
      action: ((new_state) ? 'Liked ' : 'Unliked ') +  this.props.name + '\'s' ,
      context:'Post '+ this.props.index ,
     name: (this.props.forTimeline?"Timeline":"NewsFeed"),
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
    

    return event;
  }

  onClickComment() {
    if (this.new_comment_area) {
      this.new_comment_area.focus();
    }
      
   registerEvent('Clicked on Comment icon of', this.props.name +'Post'+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
  }



 onClickUnfollow(name) {
   
     this.setState({
         unfollow:true,
         unfollowedName: name,
     }, ()=> this.props.hideAllPosts(name))
     let used = JSON.parse(localStorage.featuresUsed);
     used.friends.unfollow = true;
     localStorage.setItem("featuresUsed", JSON.stringify(used));
     
    registerEvent('Clicked to Unfollow ', this.props.name +' Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
 
 }
    
  onClickHide() {
      
     // console.log("On hide "+this.props.index)
    // TODO: Add confirmation popup and undo button
    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.some((post, index, array) => {
      if (post.key === this.props.index) {
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
        
    }else {
     registerEvent('Clicked to Hide ', this.props.name +'\'s Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
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
    }else {
        registerEvent('Clicked to Remove Tag ', this.props.name + '\'s Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
    }
  }

  onMenuOpen() {
    if (this.props.children.toLocaleLowerCase().includes("alex doe")) {
      let visited = JSON.parse(localStorage.featuresVisited);
      visited.untag.self = true;
      visited.posts.delete = true;
      visited.posts.hide = true;
      visited.friends.unfollow = true;
      localStorage.setItem("featuresVisited", JSON.stringify(visited));
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
   
    this.setState({
        showPostWhenHidden:true,
        render:true
    });
    
   }
    
    onClickAutoOk(){
    
        this.setState({
            render:false,
            showPostWhenHidden:true
        });
    }
    
    //The Block Popup that pops up when the suggestion for blocking comes up.
    BlockPopup() {
        return(
           < BlockPopup friendName={"ira_slipan"} agreeToBlock={this.agreeToBlock} cancelBlock={this.cancelBlock} routeTo={"/settings_general/blocking"}/>
        )
    }
    

  renderPost(comments,post_title) {

    if (this.state.delete_Automation && !this.state.showPostWhenHidden && this.props.index === 2) {
      return (
          <AutomationBoilerplate action = {"Adapation was for Delete_Post -> Deleting Post 2"} context = {"Delete_Post"} label={"This post about 'Mexican's going back to their country..' was automatically deleted"} onClickOK_Auto={this.onClickAutoOk} onClickUnDo_Auto = {this.onClickUndo}/>
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
                action: 'Suggestion : Delete_Post',
                context:"1",
                object: `Adaptation was for Delete_Post 2 -> ${this.props.name}\'s Post: ${this.props.children} at the ${this.props.forTimeline?"Timeline":"NewsFeed"}`,
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
                 action: 'Decline_Suggestion : Delete_Post',
                context:"0",
                object: `Adaptation was for Delete_Post 2-> ${this.props.name}\'s Post: ${this.props.children} at the ${this.props.forTimeline?"Timeline":"NewsFeed"}`,
                renderSuggestion:false
              };
              this.setState(event);
            
              //if the suggestion has not been visited/engaged with yet
              this.visitedAdaptation("Delete_Post","suggestion");
              
              return event;
            }}>
                
                
            <label>
              Hi Alex - You used foul language in this post. Do you want to delete it? 
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
            
                
           {this.props.forTimeline && post_title.includes("Alex Doe")? null:
                <Menu icon={this.state.hideHighlight1 && this.props.index === 42 || this.state.untag_Highlight && this.props.index === 27||this.state.delete_Highlight && this.props.index === 2 ?'horiz high1':'horiz'}
                 onOpen={this.onMenuOpen}>


                  <div className={this.state.hideHighlight1 && this.props.index === 42?"high1":null}><Button onClick={ this.onClickHide}>{this.props.index === 42?"Hide from Timeline": "Hide post"}</Button></div>

                  {(!this.state.tagRemoved && this.props.children.toLocaleLowerCase().includes("alex doe"))
                      ? <div className={this.state.untag_Highlight && this.props.index === 27?"high1":null}><Button onClick={this.onClickRemoveTag}>Remove tag</Button></div> : null}

                  {(this.props.name !== "Alex Doe" && this.props.target_friend !== "Alex Doe") ? <Button onClick={ () => this.onClickUnfollow(this.props.name)}>Unfollow {this.props.name}</Button> : null}

                   {(this.props.name === "Alex Doe" || this.props.target_friend === "Alex Doe" ) ? <div className={this.state.delete_Highlight && this.props.index === 2?"high1":null}> <Button href='javascript:void(0);' onClick={this.onClickDelete}>Delete</Button></div>:null}

                </Menu> 
           }                         
          </div>
          
          <VisibilitySensor onChange={(isVisible) => this.onChangeVisible (isVisible,this.props.index)} partialVisibility offset={{top:50,bottom:50}} >
              {<p>{namesToLinks(this.props.children, this.state.tagRemoved)}</p>}
          </VisibilitySensor>
          
          {this.props.photo ? <img src={this.props.photo} width="100%" height="100%"></img> : null}
        
                 { /*The Untag Automation Adaptation Popup*/ 
                    this.state.untag_Automation && this.state. displayUnTagAutomationPopup && this.props.index == 27 &&!this.state.tagRemoved && <AutomationBoilerplate action = {this.state.action_tag} context = {this.state.context_tag} label={this.state.untag_label_Auto} onClickOK_Auto={this.onClickUntag_Ok_Auto } onClickUnDo_Auto = {this.onClickUntag_Undo_Auto} />
                  }
              <hr />
              {this.actions()}
              <hr />
          
          
          {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name}>{comment.content}</Comment>)}
          <NewCommentArea type='post' name={this.props.name} index={this.props.index} post={this} forTimeline={this.props.forTimeline} />

        
           {this.state.renderSuggestion ? Suggestion_Popup : null}


            { /*The Hide Suggestion Adaptation*/
                this.state.hidesuggestion && this.state.displayHideSuggestionPopup && this.state.onscrollShowHideSuggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
            }   

            {/*The Untag Suggestion Adaptation*/
              this.state.untag_Suggestion && this.state.displayUntagSuggestionPopup &&  this.state.onscrollShowTagSuggestion && <SuggestionBoilerplate action={this.state.action_tag}  context={this.state.context_tag} label={this.state.untag_label_Sugst} agree={this.onClickUntag_OKSuggestion} destroy = {this.onClickUntag_DestroySuggestion}/>}

            {/*The Block Suggestion Adaptation*/
              this.state.block_Suggestion && this.state.displayBlockSuggestionPopup &&  this.state.onscrollShowBlockSuggestion && <SuggestionBoilerplate action={this.state.action_block}  context={this.state.context_block} label={this.state.block_label_Sugst} agree={this.onClickBlock_OKSuggestion} destroy = {this.onClickBlock_DestroySuggestion}/> }

            {/*The Block Popup that comes as confirmation after the Suggestion*/
              this.state.renderBlockPopup?this.BlockPopup():null
            }

        </div>);
    }
  }

    
  render() {
    

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
                       
            registerEvent('Clicked to Undo Hide', this.props.name +' Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
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

    if (this.props.name === 'Alex Doe') {
      let visited = JSON.parse(localStorage.featuresVisited);
      visited.posts.delete = true;
      localStorage.setItem("featuresVisited", JSON.stringify(visited));
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
                
              registerEvent('Clicked to Undo Unfollow', this.props.name +' Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
             
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
      
    /*Automation of Hiding Post */ 
    if(this.state.hideAutomation && this.state.displayHideAutomationPopup && this.props.index === 42) {
     
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
      
    /*Automation for Blocking Post*/

       let adaptationVisited = getParsed('visited')
      if(this.state.blockAutomation && this.state.displayBlockAutomationPopup && (!adaptationVisited["Block_User"]["automation"]) && (this.props.index === 17 || this.props.index === 24 || this.props.index === 32 || this.props.index === 36 || this.props.index === 41 )){
          
          return (
             <div id='post' className='hidden'>
              <div id='post-content'>
              {/*The Automation Adaptation Popup*/ 
                <AutomationBoilerplate action = {this.state.action_block} context = {this.state.context_block} label={this.state.block_label_Auto} onClickOK_Auto={this. onClickBlock_Ok_Auto} onClickUnDo_Auto = {this.onClickBlock_Undo_Auto} routeTo={"/settings_general/blocking"}
                />
               }
            </div>
        </div>
        )
      }
      
    //This is the special highlight adaptation case for block on the NewsFeed. 
    let BlockHighlightStyle = classNames({
          "high1": this.state.block_Highlight && this.props.name === "Ira Slipan"
      });

    //To indicate shared Post
    var post_title = [<span key={0} className= {BlockHighlightStyle}><ProfileLink name={this.props.name} key={0} onClick={this.registerClick} /></span>];
   
    if (this.props.original_poster) {
      post_title.push(' shared ');
      post_title.push(<ProfileLink name={this.props.original_poster} key={this.props.index} onClick={this.registerClick}/>);
      post_title.push('\'s post');
    } else if (this.props.target_friend) {
      post_title.push(' ➤ ');
      post_title.push(<ProfileLink name={this.props.target_friend} key={this.props.index} onClick={this.registerClick}/>);
    }
      
    /*To indicate tagged Post*/
    if (!this.state.tagRemoved && !this.state.untag_Automation && this.props.children.includes("Alex Doe")  ){
        post_title.push(' is with ');
        post_title.push(<ProfileLink name={"Alex Doe"} key={1} onClick={this.registerClick}/>   );
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
          
          {this.props.displayContactInfoSuggestion && this.state.displayContactInfoSuggestion && this.props.index === 0 && <SuggestionBoilerplate action={"Contact_Info_Adaptation-> change email address"}  context={"Contact_Info"} label={'Hi Alex -You seem to have an old email address listed on your profile. Do you want to update your email address to "alexdoe@gmail.com".'} agree={this.onClickOK_ContactInfoSuggestion} destroy = {this.onDisplayContactInfoSuggestion}  routeTo={`/profile/${nameToLink("Alex Doe")}/about/contact`}/>}
          
           {this.props.displayBasicInfoSuggestion && this.state.displayBasicInfoSuggestion && this.props.index === 0 && <SuggestionBoilerplate action={"Basic_Info_Adaptation-> change political view"}  context={"Basic_Info"} label={"Hi Alex - You recently removed some of your posts about politics. Do you want to remove your political views from your profile page?"} agree={this.onClickOK_BasicInfoSuggestion} destroy = {this.onDisplayBasicInfoSuggestion} routeTo={`/profile/${nameToLink("Alex Doe")}/about/contact`}/>}

            {this.state.renderSharePopup ?
                    <Popup title="Post shared" closeButton grayHeader content_style width={300} height={10}
                        cancel={() => {this.setState({renderSharePopup: false})}}
                        closeButtonName="Close">
                        This has been shared to your timeline.
                    </Popup>
                    : null}
          
          {    /*These happen on the Timeline */
                
                /*The Unsubscribe Suggestion Adaptation*/
            (this.props.name == "Jack Scout") && this.props.displayUnsubscribeSuggestion && this.state.unsubcribe_displaySuggestionPopup && this.props.index === 1 && <SuggestionBoilerplate action={"unsubscribe_Friend_Adaptation -> unfollowing Jack Scout"}  context={"Unsubscribe_Friend"} label={"Hi Alex - You are constantly hiding  Jack Scout’s posts. Do you want to unfollow Jack? You’ll still be friends with him but won’t see his posts in NewsFeed anymore."} agree ={this.onClickOK_UnsubscribeSuggestion} destroy = {this.onClickDestroyUnsubscribeSuggestion}/>
                  
           }
           
             {  /*The Categorize Suggestion Adaptation*/
             (this.props.name == "Sasha Riley") && this.props.displayCategorizeSuggestion&& this.state.categorize_displaySuggestionPopup && this.props.index === 21 && <SuggestionBoilerplate action={"Adaptation was Categorize_Friend -> categorizing Sasha Riley as  a Recruiter"}  context={"Categorize_Friend"} label={"Hi Alex - You recently added Sasha Riley, who is a recruiter at RBW, as a friend. Would you like to add Sasha Riley  to the “Recruiters” friend list?"} agree ={this.onClickOK_CategorizeSuggestion} destroy = {this.onClickDestroyCategorizeSuggestion}/>
                  
           }
              
          </div>
    
        
      </div>);
  }
}

export default Post;
