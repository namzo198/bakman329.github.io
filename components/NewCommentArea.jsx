import React from 'react';
import ReactDOM from 'react-dom';
import {registerEvent} from '../utilities.js';

class NewCommentArea extends React.Component {
   constructor(props) {
      super(props);
      this.state = {value: ''};
      this.onKeyPress = this.onKeyPress.bind(this);
   }

   onKeyPress(e) {
      if (e.key === 'Enter') {
         if(this.state.value === '') {
            return;
         }

         var posts = JSON.parse(localStorage.getItem('posts'));
         var post_index;

         // This if statement was causing wrong replying behavior
         // It seems that it is entirely unnecessary, though it is possible that replying is bugged with it removed
         // if (this.props.type === 'post') {
          posts.some((post, index, array) => {
            if (post.key == this.props.index) {
              post_index = index;
              return true;
            }
          });
         // }
         /* else if (this.props.type === 'reply') {
            post_index = this.props.index - 1;
         }
         else {
            return;
         } */

         if (posts[post_index]) {
            var content = this.state.value;
            // TODO: Consider replacing these two props with one "replyto" prop who's presence implies type=reply
            if (this.props.type === 'reply') {
                content = this.props.replyto + ' ' + content;
            }

            posts[post_index].comments.push({'name': 'Alex Doe', 'img': './assets/users/alex_profile_img.jpg', 'content': content});
            localStorage.posts = JSON.stringify(posts);
         }
        
       
          
         this.setState({value: ''});
         this.props.post.forceUpdate();

         if (this.props.type === 'reply') {
            this.props.parent.setState({render_reply_area: false});
            this.props.parent.forceUpdate();
         }
          
        registerEvent('Entered this comment "'+ content +'" for', this.props.name +' Post '+ this.props.index, (this.props.forTimeline?"Timeline":"NewsFeed"));
      }
   }

   render() {
      return (
         <input id='post-new-comment' type='text' placeholder={(this.props.type == 'reply') ?
             'Write a reply...' :
             'Write a comment...'}
            rows='1' cols='65' onKeyPress={this.onKeyPress}
            onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}
            autoComplete='off' ref={(input) => {this.props.post.new_comment_area = input}} />
      );
   }
}

export default NewCommentArea;