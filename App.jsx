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

class Comment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {render_reply_area: false};
      this.onClickLike = this.onClickLike.bind(this);
      this.onClickReply = this.onClickReply.bind(this);
      this.actions = this.actions.bind(this);
   }

   onClickLike() {

   }

   onClickReply() {
      this.setState({render_reply_area: true});
      this.forceUpdate();
   }

   replyArea() {
      if (!this.state.render_reply_area) {
         return;
      }

      return (
         <NewCommentArea type='reply' index={this.props.index} parent={this} post={this.props.post} />
      );
   }

   actions() {
      return (
         <div id='comment-actions'>
            <Button href='javascript:void(0);' onClick={this.onClickLike}>Like</Button>
            <span id='comment-actions-dot'>·</span>
            <Button href='javascript:void(0);' onClick={this.onClickReply}>Reply</Button>
         </div>
      );
   }

   render() {
      return (
      <div id='comment'>
         <img id='comment-profile-pic' src={this.props.img} />
         <div id='comment-content'>
            <a href='#' id='comment-name'>{this.props.name}</a>
            <p>{' ' + this.props.children}</p>
            <br />
            {this.actions()}
         </div>
         {this.replyArea()}
      </div>);
   }
}

function indexPosts() {
   var posts = JSON.parse(localStorage.getItem('posts'));
   JSON.parse(localStorage.getItem('posts')).forEach((post, index, array) => {
      posts[index].key = posts.length - (index + 1);
   });
   localStorage.setItem('posts', JSON.stringify(posts));
}

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

         if (this.props.type === 'post') {
            posts.some((post, index, array) => {
              if (post.key == this.props.index) {
                post_index = index;
                return true;
              }
            });
         }
         else if (this.props.type === 'reply') {
            post_index = this.props.index - 1;
         }
         else {
            return;
         }

         if (posts[post_index]) {
            posts[post_index].comments.push({'name': 'John Doe', 'img': './assets/profile_img.jpg', 'content': this.state.value});
            localStorage.posts = JSON.stringify(posts);
         }

         this.setState({value: ''});
         this.props.post.forceUpdate();

         if (this.props.type === 'reply') {
            this.parent.setState({render_reply_area: false});
            this.parent.forceUpdate();
         }
      }
   }

   render() {
      return (
         <input id='post-new-comment' type='text' placeholder='Write a comment...'
            rows='1' cols='65' onKeyPress={this.onKeyPress}
            onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}
            autoComplete='off' ref={(input) => {this.props.post.new_comment_area = input}} />
      );
   }
}

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
               {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} name={comment.name} img={comment.img}>{comment.content}</Comment>)}
               <NewCommentArea type='post' index={this.props.index} post={this} />
            </div>
         </div>);
   }
}

function resetPosts() {
   localStorage.setItem('posts', JSON.stringify(
      [{name: 'John Doe',
        img: './assets/profile_img.jpg',
        content: 'Hi, I\'m John',
        comments: [{name: 'Jack Roe',
                    img: './assets/profile_img.jpg',
                    content: 'Hi, John. I\'m Jack'}],
        key: 1},
       {name: 'Jack Roe',
        img: './assets/profile_img.jpg',
        content: 'There is a party at my house tommorow',
        comments: [],
        key: 0}]));
}

function resetChat() {
   localStorage.setItem('incoming_messages', JSON.stringify(
      {'Jack Roe': ['Hello, John', 'How\'re you doing?']}));
   localStorage.setItem('outgoing_messages', '{}');
}

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
         out[index] = React.createElement(Post, {name: post.name, img: post.img, key: count - index - 1, index: count - index - 1, original_poster: post.original_poster}, post.content);
      });

      return out;
   }

   static update() {
      this.forceUpdate();
   }

   render() {
      return (
         <div id='post-area'>
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

     var posts = JSON.parse(localStorage.getItem('posts'));
     var post = {name: 'John Doe',
                 img: './assets/profile_img.jpg',
                 content: this.state.value,
                 key: posts.length,
                 comments: []};
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     PostArea.update();

     return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   render() {
      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'>
               <textarea rows='6' cols='65' placeholder="What's on your mind?" value={this.state.value} onChange={this.onChange} />
               <hr />
               <div id='actions'>
                  <Button href='javascript:void(0);' onClick={this.onClick}>Post</Button>
               </div>
            </div>
         </div>);
   }
}

class ChatUser extends React.Component {
   render() {
      return (
         <div id='chat-user'>
            <img id='profile-pic' src={this.props.img} />
            <a href='#'>Jack Roe</a>
         </div>
      )
   }
}

class Chat extends React.Component {
   render() {
      return (
         <div id='chat-container'>
            <ChatWindow name='Jack Roe' />
            <div id='chat'>
               <ChatUser img='./assets/profile_img.jpg' />
            </div>
         </div>
      );
   }
}

class ChatWindow extends React.Component {
   constructor(props) {
      super(props);
      this.state = {value: ""}
   }

   render() {
      if (!localStorage.incoming_messages) { // || !localStorage.outgoing_messages) {
         resetChat();
      }

      var incoming_messages_list = JSON.parse(localStorage.incoming_messages)[this.props.name];
      var incoming_messages = [];
      if (incoming_messages_list) {
         for (var i = 0; i < incoming_messages_list.length; i++) {
            incoming_messages.push(<p key={i}>{incoming_messages_list[i]}</p>);
         }
      }

      /* var outgoing_messages_list = JSON.parse(localStorage.outgoing_messages)[this.props.name];
      var outgoing_messages = [];
      if (outgoing_messages_list) {
         for (var i = 0; i < outgoing_messages_list.length; i++) {
            outgoing_messages.push(<p id='chat-right' key={i}>{outgoing_messages_list[i]}</p>);
         }
      } */

      return (
         <div id='chat-window'>
            <div id='chat-name'>
               <a href='#'>{this.props.name}</a>
            </div>
            <div id='chat-content'>
               {incoming_messages}
            </div>
            <input id='new-message' type='text' placeholder='Write a comment...'
               rows='1' cols='65' onKeyPress={this.onKeyPress}
               onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}
               autoComplete='off' ref={(input) => {this.props.post.new_comment_area = input}} />
         </div>
      );
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
               <h1 id='logo'>fakebook</h1>
               <div id='user'>
                  <img id='profile-pic' src='./assets/profile_img.jpg' />
                  <div id='header-text'>
                     <p>John Doe</p>
                     <p>Home</p>
                     <p>Find Friends</p>
                  </div>
               </div>
            </header>
            <div id='page-content'>
               <ul id='left-navagation'>
                  <li>
                     <img src='./assets/profile_img.jpg' />
                     <a href='#'>John Doe</a>
                  </li>
                  <li>
                     <img src='./assets/news_feed.jpg' />    
                     <a href='#'>News Feed</a>
                  </li>
                  <li>
                     <a href='javascript:void(0)' onClick={() => { resetPosts(); resetChat(); location.reload(); }}>Reset Posts(DEBUG)</a>
                  </li>
               </ul>
               <PostArea />
               <div id='chat-area'>
                  <Chat />
               </div>
            </div>
         </div>
      );
   }
}

export default App;