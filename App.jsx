import React from 'react';
import ReactDOM from 'react-dom';
import {CreateEvent} from './controller/databaseFunctions.js';

class Button extends React.Component {
   constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
   }

   onClick() {
      var state = this.props.onClick();
      var event = {action : state.action,
                   details : state.context,
                   object : state.name};
      CreateEvent(event);
   }

   render() {
      return (<a href={this.props.href} onClick={this.onClick}>{this.props.children}</a>);
   }
}

class Post extends React.Component {
   constructor(props){
      super(props);
      this.state = {
          render: true,
          name:"",
          context:"From NewsFeed",
          action:""};
      this.clickDelete = this.clickDelete.bind(this);
   }

   clickDelete(){
     var event = {
         render:false,
         action:'Deleted',
         context: this.state.context,
         name: this.props.name + '\'s Post'
     };
     this.setState(event);
     var posts = localStorage.getItem("posts").split('');
     posts[Number(this.props.postid)*2] = 0;
     localStorage.setItem("posts", posts.join(''));

     return event;
   }

   actions() {
       
      if (this.props.name == "John Doe") {
         return(
         <div id="actions">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <Button href="javascript:void(0);" onClick={this.clickDelete}>Delete</Button>
         </div>);
      }
      else {
         return(
         <div id="actions">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <a href="#">Share</a>
         </div>);
      }
   }

   render() {
      // Multiply index by two to skip commas in string
      if (localStorage.getItem('posts')[this.props.postid*2] == 0) {
         return null;
      }

      return(
         <div id="post">
            <div id="post-content">
               <div id="post-info">
                  <img id="post-pic" src={this.props.img} />
                  <div id="post-text">
                     <a href="#" id="post-name">{this.props.name}</a>
                     <p id="post-time">1 hr</p>
                  </div>
               </div>
               <p>{this.props.children}</p>
               <hr />
               {this.actions()}
            </div>
         </div>);
   }
}

class PostArea extends React.Component {
   constructor(props) {
      super(props);
      this.count = React.Children.count(this.props.children)
      // If null, init to 1's
      if (localStorage.getItem("posts") == null) {
         localStorage.setItem("posts", (new Array(this.count).fill(1, 0, this.count)));
      }
   }

   render() {
      return (
         <div id="post-area">
            {this.props.children}
         </div>);
   }
}

class App extends React.Component {
   render() {
      return (
         <div>
            <header>
               <h1 id="logo">fakebook</h1>
               <div id="user">
                  <img id="profile-pic" src="./assets/profile_img.jpg" />
                  <div id="header-text">
                     <p>John Doe</p>
                     <p>Home</p>
                     <p>Find Friends</p>
                  </div>
               </div>
            </header>
            <div id="page-content">
               <ul id="left-navagation">
                  <li>
                     <img src="./assets/profile_img.jpg" />
                     <a href="#">John Doe</a>
                  </li>
                  <li>
                     <img src="./assets/news_feed.jpg" />    
                     <a href="#">News Feed</a>
                  </li>
                  <li>
                     <a href="javascript:void(0)" onClick={() => { localStorage.setItem("posts", null); location.reload(); }}>Reset Posts(DEBUG)</a>
                  </li>
               </ul>
               <PostArea>
                  <Post name="John Doe" img="./assets/profile_img.jpg" postid='0'>Hi, I'm John.</Post>
                  <Post name="Jack Roe" img="./assets/profile_img.jpg" postid='1'>There is a party at my house tommorow.</Post>
               </PostArea>
            </div>
         </div>
      );
   }
}

export default App;