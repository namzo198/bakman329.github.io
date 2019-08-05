import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post.jsx'
import NewPostArea from './NewPostArea.jsx'
import {resetPosts,unFollowUser} from '../utilities.js'

class PostArea extends React.Component {
   constructor(props) {
      super(props);
     
       this.state = {
           hello:true,
       }
      // If null, init to 1's
      if (localStorage.getItem('posts') == 'null') {
         resetPosts();
      }

      this.update = this.update.bind(this);
       this. hideAllPostsfromNewsFeed = this. hideAllPostsfromNewsFeed.bind(this);
   }

   getPosts() {
      var out = [];

      var count = JSON.parse(localStorage.posts).length;
      JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
         // Create posts for rendering
         // Key and count are in reverse order, hence subtracting from count
          //
          let render = true;
          if (this.props.name) {
            render = (post.name === this.props.name);
           // console.log(render)
          }
          else {
            render = (post.new || post.name != "Alex Doe");
          }
         out[index] = React.createElement(Post,
          {name: post.name,
           key: count -  index - 1,
           index: count - index - 1,
           original_poster: post.original_poster,
           adapt:this.props.toAdapt,
           photo: post.photo,
           displayContactInfoSuggestion: this.props.displayContactInfoSuggestion,
           displayUnsubscribeSuggestion:this.props.displayUnsubscribeSuggestion,
           updateSubscribe:this.props.updateSubscribe,
           displayCategorizeSuggestion:this.props. displayCategorizeSuggestion,
           render: render,
           audience: post.audience,
           time: post.time,
           tagRemoved: post.tagRemoved || false,
           update:this.update, 
           hidden: post.hidden || false,
           forTimeline: this.props.forTimeline,
           hideAllPosts: this.hideAllPostsfromNewsFeed,},post.content);
      });
      return out;
   }
   
     hideAllPostsfromNewsFeed(name) {
       // var count = 0;
        unFollowUser(name);
       //  console.log(users);
         this.update();
    
     }

   update() {
      
      this.forceUpdate();
   }

   render() {
       console.log("Render Post Area")
       //console.log("PostArea: The suggestion is"+ this.props.displayContactInfoSuggestion);
      return (
         <div id='post-area'>
            <NewPostArea postarea={this} forTimeline={this.props.forTimeline} name={this.props.name}/>
            {this.getPosts()}
         </div>);
   }
}

export default PostArea;
