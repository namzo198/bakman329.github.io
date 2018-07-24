import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import PostArea from './PostArea.jsx'





class NewPostArea extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {value: ''};
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      var event = {
         action: 'Post Created',
         context: 'From NewsFeed',
         name: 'John Doe'
     };

     if (this.state.value == '') {
         return null;
     }

     var posts = JSON.parse(localStorage.getItem('posts'));
       
     var post = {name: 'John Doe',
                 img: './assets/profile_img.jpg',
                 content: this.state.value,
                 key: posts.length,
                 comments: []};
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     PostArea.update();
     this.state.value = '';

     return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   render() {
      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'>
               <textarea rows='6'  placeholder="What's on your mind?" value={this.state.value} onChange={this.onChange} />
               <hr />
               <div id='actions'>
                   <Button href='javascript:void(0);' onClick={this.onClick}>Post</Button>
               </div>
            </div>
         </div>);
   }
}

export default NewPostArea;