import React from 'react';
import ReactDOM from 'react-dom';

import Post from './Post.jsx'
import NewPostArea from './NewPostArea.jsx'

import {resetPosts} from '../utilities.js'

class PostArea extends React.Component {
   constructor(props) {
      super(props);

      // If null, init to 1's
      if (localStorage.getItem('posts') == 'null') {
         resetPosts();
      }

      PostArea.update = PostArea.update.bind(this);
   }

   getPosts() {
      var out = [];

      var count = JSON.parse(localStorage.posts).length;
      JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
         // Create posts for rendering
         // Key and count are in reverse order, hence subtracting from count
          //
         out[index] = React.createElement(Post, {name: post.name, img: post.img, key: count -  index - 1, index: count - index - 1, original_poster: post.original_poster, adapt:this.props.toAdapt}, post.content);
      });
 
       //console.log("Post Area "+this.props.toAdapt)
      return out;
   }
     

   static update() {
      this.forceUpdate();
   }

   render() {
      return (
         <div id='post-area'>
            <NewPostArea postarea={this}/>
            {this.getPosts()}
            {/*this.getAutomatic(2)*/}
         </div>);
   }
}

export default PostArea;