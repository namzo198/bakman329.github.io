import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts, getProfilePic, audienceText,getParsed,saveVisitedAdaptation} from '../utilities.js'

import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Menu from './Menu.jsx'
import Popup from './Popup.jsx'
import ContactInfoSuggestion from './profile/settings/contactDisplays/ContactInfoSuggestion.jsx'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import Automation from '../adaptations/Automation.jsx'
import ProfileLink from './ProfileLink.jsx'


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
    this.state = {
      render: render && !hidden,
      name: '',
      context: 'From NewsFeed',
      action: '',
      value: '',
      showPostWhenHidden: false,
      renderSuggestion:false,
      hidden: hidden,  
      displayContactInfoSuggestion:true,
      adaptations: getParsed('adaptations'),
      adaptationVisited: getParsed('visited')
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
    this.onClickUndo = this.onClickUndo.bind(this);
    this.onClickAutoOk = this.onClickAutoOk.bind(this);
    this.onDisplayContactInfoSuggestion = this.onDisplayContactInfoSuggestion.bind(this);
    this.show = this.show.bind(this);
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
      PostArea.update();

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
    PostArea.update();
      
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
    let adaptations = getParsed('adaptations');
    let adaptationVisited = getParsed("visited");
      
    if (!this.state.adaptationVisited["DeletePost"]["automation"] && adaptations['deletetimeline'] === 'auto' && !this.state.showPostWhenHidden && this.props.index === 9) {
      return (
              
              <Automation Undobutton="Undo" Okbutton="Ok" onOkClick={this.onClickAutoOk} label="This post was automatically deleted" onUndoClick={this.onClickUndo} />
             
      );
    }
    else {
      // Suggestion adaptation for the delete method
      var Suggestion_Popup;
      if (!this.state.adaptationVisited["DeletePost"]["suggestion"] && adaptations['deletetimeline'] === 'sugst' && this.props.index === 6) {
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
            <Menu icon='horiz'>
              <Button onClick={this.onClickHide}>Hide post</Button>
              {(this.props.name != "Alex Doe") ? <Button>Unfollow {this.props.name}</Button> : null}
            </Menu>
          </div>
          <p>{this.props.children}</p>
          {this.props.photo ? <img src={this.props.photo} width="40px" height="40px"></img> : null}
          <hr />
        
          {this.actions()}
          <hr />
          {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name}>{comment.content}</Comment>)}
          <NewCommentArea type='post' index={this.props.index} post={this} />

          {this.state.renderSuggestion ? Suggestion_Popup : null}
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

    var post_title = [<ProfileLink name={this.props.name} key={0} />];
    if (this.props.original_poster) {
      post_title.push(' shared ');
      post_title.push(<ProfileLink name={this.props.original_poster} key={1} />);
      post_title.push('\'s post');
    }

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
    let adaptations = JSON.parse(localStorage.adaptations);
      
     
      
    return(
        
      <div id='post'>
      {console.log("In Post Props"+this.props.displayContactInfoSuggestion +" State"+this.state.displayContactInfoSuggestion)}
      
       {!this.state.adaptationVisited["DeletePost"]["automation"] && adaptations['deletetimeline'] === 'auto'&& this.props.index === 9?
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