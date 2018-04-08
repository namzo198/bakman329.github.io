import React from 'react';
import ReactDOM from 'react-dom';
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          render: true,
          name: '',
          context: 'From NewsFeed',
          action: '',
          value: ''};
      this.onClickDelete = this.onClickDelete.bind(this);
      this.onClickShare = this.onClickShare.bind(this);
      this.onClickLike = this.onClickLike.bind(this);
      this.onClickComment = this.onClickComment.bind(this);
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
                 img: './assets/profile_img.jpg',
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

   actions() {
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
         return(
         <div id='actions'>
            <Button href='javascript:void(0);' onClick={this.onClickLike}>{like_text}</Button>
            <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
            <Button href='javascript:void(0);' onClick={this.onClickDelete}>Delete</Button>
         </div>);
      }
      else {
         return(
         <div id='actions'>
            <Button href='javascript:void(0);' onClick={this.onClickLike}>{like_text}</Button>
            <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>
            <Button href='javascript:void(0);' onClick={this.onClickShare}>Share</Button>
         </div>);
      }
   }

   render() {
      if (!this.state.render) {
         return null;
      }

      var post_title = this.props.name;
      if (this.props.original_poster) {
         post_title += ' shared ' + this.props.original_poster + '\'s post';
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

      return(
         <div id='post'>
            <div id='post-content'>
               <div id='post-info'>
                  <img id='post-pic' src={this.props.img} />
                  <div id='post-text'>
                     <a href='#' id='post-name'>{post_title}</a>
                     <p id='post-time'>1 hr</p>
                  </div>
               </div>
               <p>{this.props.children}</p>
               <hr />
               {this.actions()}
               <hr />
               {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name} img={comment.img}>{comment.content}</Comment>)}
               <NewCommentArea type='post' index={this.props.index} post={this} />
            </div>
         </div>);
   }
}

export default Post;