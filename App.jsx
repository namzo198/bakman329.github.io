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
      if (state == null) {
         return;
      }

      var event = {action : state.action,
                   details : state.context,
                   object : state.name};
      CreateEvent(event);
   }

   render() {
      return (<a href={this.props.href} onClick={this.onClick}>{this.props.children}</a>);
   }
}

function indexPosts() {
   var posts = JSON.parse(localStorage.getItem('posts'));
   JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
      posts[index].key = posts.length - (index + 1);
   });
   localStorage.setItem('posts', JSON.stringify(posts));
}

class Post extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          render: true,
          name: "",
          context: "From NewsFeed",
          action: ""};
      this.clickDelete = this.clickDelete.bind(this);
      this.clickShare = this.clickShare.bind(this);
      this.clickLike = this.clickLike.bind(this);
   }

   clickDelete() {
     var event = {
         render: false,
         action: 'Deleted',
         context: this.state.context,
         name: this.props.name + '\'s Post'
     };

     this.setState(event);
     var posts = JSON.parse(localStorage.getItem("posts"));
     posts.some((post, index, array) => {
         if (post.key == this.props.index) {
            posts.splice(index, 1);
            return true;
         }
     });
     localStorage.setItem("posts", JSON.stringify(posts));
     indexPosts();

     return event;
   }

   clickShare() {
      var event = {
         action: 'Shared',
         context: this.state.context,
         name: this.props.name + '\'s Post'
      };

     var posts = JSON.parse(localStorage.getItem("posts"));
     var post = {name: 'John Doe',
                 original_poster: this.props.name,
                 img: './assets/profile_img.jpg',
                 content: this.props.children,
                 key: posts.length};
     localStorage.setItem("posts", JSON.stringify([post].concat(posts)));
     indexPosts();
     PostArea.update();

     return event;
   }

   clickLike() {
      var posts = JSON.parse(localStorage.getItem("posts"));
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

      var posts = JSON.parse(localStorage.getItem("posts"));
      posts.some((post, index, array) => {
         if (post.key == this.props.index) {
            post.liked = new_state;
            return true;
         }
     });
     localStorage.setItem("posts", JSON.stringify(posts));
     indexPosts();
     PostArea.update();

      return event;
   }

   actions() {
      var posts = JSON.parse(localStorage.getItem("posts"));
      var liked = false;
      posts.some((post, index, array) => {
         if (post.key == this.props.index) {
            liked = post.liked;
            return true;
         }
      });
      var like_text = ((liked) ? "Unlike" : "Like")
      if (this.props.name == "John Doe") {
         return(
         <div id="actions">
            <Button href="javascript:void(0);" onClick={this.clickLike}>{like_text}</Button>
            <a href="#">Comment</a>
            <Button href="javascript:void(0);" onClick={this.clickDelete}>Delete</Button>
         </div>);
      }
      else {
         return(
         <div id="actions">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <Button href="javascript:void(0);" onClick={this.clickShare}>Share</Button>
         </div>);
      }
   }

   render() {
      if (!this.state.render) {
         return null;
      }

      var post_title = this.props.name;
      if (this.props.original_poster) {
         post_title += " shared " + this.props.original_poster + "\'s post"
      }
      return(
         <div id="post">
            <div id="post-content">
               <div id="post-info">
                  <img id="post-pic" src={this.props.img} />
                  <div id="post-text">
                     <a href="#" id="post-name">{post_title}</a>
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

// Debug, move into PostArea when stable
function resetPosts() {
   localStorage.setItem("posts", JSON.stringify([{name: 'John Doe',
                                            img: './assets/profile_img.jpg',
                                            content: 'Hi, I\'m John',
                                            key: 1},
                                           {name: 'Jack Roe',
                                            img: './assets/profile_img.jpg',
                                            content: 'There is a party at my house tommorow',
                                            key: 0}]));
}

class PostArea extends React.Component {
   constructor(props) {
      super(props);

      // If null, init to 1's
      if (localStorage.getItem("posts") == 'null') {
         resetPosts();
      }

      PostArea.update = PostArea.update.bind(this);
   }

   getPosts() {
      var out = [];

      var count = JSON.parse(localStorage.posts).length;
      JSON.parse(localStorage.getItem("posts")).forEach((post, index, array) => {
         // Create posts for rendering
         // Key and count are in reverse order, hence subtracting from count
         out[index] = React.createElement(Post, {name: post.name, img: post.img, key: count - index - 1, index: count - index - 1, original_poster: post.original_poster}, post.content);
      });

      return out;
   }

   static update() {
      this.forceUpdate();
   }

   render() {
      return (
         <div id="post-area">
            <NewPostArea postarea={this} />
            {this.getPosts()}
         </div>);
   }
}

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

     var posts = JSON.parse(localStorage.getItem("posts"));
     var post = {name: 'John Doe',
                 img: './assets/profile_img.jpg',
                 content: this.state.value,
                 key: posts.length};
     localStorage.setItem("posts", JSON.stringify([post].concat(posts)));
     indexPosts();
     PostArea.update();

     return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   render() {
      return (
         <div id="new-post-area">
            <div id="new-post-area-content">
               <textarea rows="6" cols="65" placeholder="What's on your mind?" value={this.state.value} onChange={this.onChange} />
               <hr />
               <div id="actions">
                  <Button href="javascript:void(0);" onClick={this.onClick}>Post</Button>
               </div>
            </div>
         </div>);
   }
}

class App extends React.Component {
   constructor(props) {
      super(props);
      if (!localStorage.posts) {
         resetPosts();
         location.reload();
      }
   }

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
                     <a href="javascript:void(0)" onClick={() => { resetPosts(); location.reload(); }}>Reset Posts(DEBUG)</a>
                  </li>
               </ul>
               <PostArea />
            </div>
         </div>
      );
   }
}

export default App;