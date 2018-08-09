import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts, getProfilePic} from '../utilities.js'

import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Menu from './Menu.jsx'
import Popup from './Popup.jsx'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import Automation from '../adaptations/Automation.jsx'
import ProfileLink from './ProfileLink.jsx'

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
      hidden: hidden
    };

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickComment = this.onClickComment.bind(this);
    this.onClickHide = this.onClickHide.bind(this);
    this.onClickUndo = this.onClickUndo.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    // Set a time on when to display the Suggestion.
    if (!this.state.hidden) {
      setTimeout(() => this.show(), 2000);
    }
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
        action: 'Deleted',
        context: this.state.context,
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

      return event;
  }

  onClickShare() {
      var event = {
        action: 'Shared',
        context: this.state.context,
        name: this.props.name + '\'s Post'
      };

      var posts = JSON.parse(localStorage.getItem('posts'));
      var post = {name: 'John Doe',
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
    var posts = JSON.parse(localStorage.getItem('posts'));
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

    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        post.liked = new_state;
        return true;
      }
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    indexPosts();
    PostArea.update();

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
    let adaptations = JSON.parse(localStorage.adaptations);
    var posts = JSON.parse(localStorage.getItem('posts'));
    var liked = false;
    posts.some((post, index, array) => {
      if (post.key == this.props.index) {
        liked = post.liked;
        return true;
      }
    });

    var like_text = ((liked) ? 'Unlike' : 'Like')
    if (this.props.name == 'John Doe') {
      // console.log("The delete button adaptation is", adaptMethod.deletepost)
      // Keep an array where I specify index and just loop  
      return(
        <div id='actions'>
          <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={adaptations['liketimeline']}>{like_text}</Button>
          <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
          <Button href='javascript:void(0);' onClick={this.onClickDelete} adapt={adaptations['deletetimeline']}>Delete</Button>
        </div>);
    }
    else {
      return(
        <div id='actions'>
          <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={adaptations['liketimeline']}>{like_text}</Button>
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

    return event;
  }

  renderPost(comments,post_title) {
    let adaptations = JSON.parse(localStorage.adaptations);
    if (adaptations['deletetimeline'] === 'auto' && !this.state.showPostWhenHidden) {
      return (
        <Automation Undobutton="Undo" label="This post was automatically deleted" onUndoClick={this.onClickUndo} />
      );
    }
    else {
      // Suggestion adaptation for the delete method
      var Suggestion_Popup;
      if (adaptations['deletetimeline'] === 'sugst' && this.props.index === 2) {
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
              
              return event;
            }}>
            
            <label>
                I think you should delete {post_title}'s Post that states  "{this.props.children}."
            </label>
          </SuggestionPopup>);
      }

      return(
        <div>
          <div id='post-info'>
            <img id='post-pic' src={getProfilePic(this.props.name)} />
            <div id='post-text'>
              <div id='post-name'>{post_title}</div>
              <p id='post-time'>1 hr</p>
            </div>
            <Menu icon='horiz'>
              <Button onClick={this.onClickHide}>Hide post</Button>
              {(this.props.name != "John Doe") ? <Button>Unfollow {this.props.name}</Button> : null}
            </Menu>
          </div>
          <p>{this.props.children}</p>
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
    console.log(this.state)
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

    return(
      <div id='post'>
        <div id='post-content'> 
          <p>{/*this.props.children*/}</p> 
          {this.renderPost(comments,post_title)}
        </div>
      </div>);
  }
}

export default Post;