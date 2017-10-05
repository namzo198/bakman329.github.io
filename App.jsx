import React from 'react';
import ReactDOM from 'react-dom';
import {CreateEvent} from './controller/databaseFunctions.js';
import  PropTypes from 'prop-types';

//Get the hashId session index.htm/:sessionid=theidisthisone

/**http://fakebook.usabart.nl/?session_id=a09eb84d555bb8d55510ef28a56a6f3d&changesub=auto&unsubstatus=auto&reportspam=auto&requestphoto=auto&timelinevisibility=auto&restrictuser=auto&blockevent=auto&chatoffline=auto&withholdcellphone=auto&withholdotherphone=auto&withholdim=auto&withholdstreet=auto&withholdinterest=auto&withholdreligion=auto&withholdpolitical=auto
*/

class Button extends React.Component {
   constructor(props,context) {
      super(props,context);
      this.onClick = this.onClick.bind(this);
    }

   onClick() {
      var state = this.props.onClick();
      if (state == null) {
         return;
      }

      var event = { action : state.action,
                    details : state.context,
                    object : state.name,
                    session_id: this.context.session
                  };
      // console.log("The Button session is", this.context.session);
      // console.log("The Button newsfeed is", this.context.NewsFeed);
      // console.log("The Button timeline is", this.context.Timeline);
       
      CreateEvent(event);
   }

   render() {
      return (<a id={this.props.id} href={this.props.href} onClick={this.onClick}>{this.props.children}</a>);
   }
}
// Helps the Button Component access the global variables
Button.contextTypes = {
    session: PropTypes.string,
    NewsFeed: PropTypes.bool,
    Timeline: PropTypes.bool
};

class Comment extends React.Component {
    constructor(props) {
       super(props);
       this.state = {render_reply_area: false, liked: this.getLiked()};

       this.getLiked = this.getLiked.bind(this);
       this.onClickLike = this.onClickLike.bind(this);
       this.onClickReply = this.onClickReply.bind(this);
       this.onClickDelete = this.onClickDelete.bind(this);
       this.actions = this.actions.bind(this);
    }

    getLiked() {
        var posts = JSON.parse(localStorage.getItem('posts'));
        var post_index;

        posts.some((post, index, array) => {
          if (post.key == this.props.index) {
            post_index = index;
            return true;
          }
        });

        var result = posts[post_index].comments[this.props.commentindex].liked;

        if (result != undefined) {
            return result;
        }
        else {
            return false;
        }
    }

    onClickLike() {
        var posts = JSON.parse(localStorage.getItem('posts'));
        var new_state = !this.state.liked;

        var event = {
           action: ((new_state) ? 'Liked' : 'Unliked'),
           context: this.state.context,
           name: this.props.name + '\'s Comment'
        }

        var post_index;

        posts.some((post, index, array) => {
          if (post.key == this.props.index) {
            post_index = index;
            return true;
          }
        });

        if (posts[post_index]) {
           posts[post_index].comments[this.props.commentindex].liked = new_state;
           localStorage.posts = JSON.stringify(posts);
        }

        this.setState({'liked': new_state});
        this.props.post.forceUpdate();

        return event;
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
          <NewCommentArea type='reply' replyto={this.props.name} index={this.props.index} parent={this} post={this.props.post} />
       );
    }

    onClickDelete() {
        var posts = JSON.parse(localStorage.getItem('posts'));

        var event = {
           action: 'Deleted',
           context: 'From NewsFeed', // this.state.context,
           name: this.props.name + '\'s Comment'
        }

        posts.some((post, index, array) => {
          if (post.key == this.props.index) {
            posts[index].comments.splice(this.props.commentindex, 1);
            localStorage.posts = JSON.stringify(posts);
            return true;
          }
        });

        this.props.post.forceUpdate();
    }

    actions() {
       var delete_if_user;
       if (this.props.name === 'John Doe') {
           delete_if_user = [
             <span id='comment-actions-dot' key={0}>·</span>,
             <Button href='javascript:void(0);' onClick={this.onClickDelete} key={1}>Delete</Button>
           ];
       }
       return (
          <div id='comment-actions'>
             <Button href='javascript:void(0);' onClick={this.onClickLike}>{(this.state.liked) ? "Unlike" : "Like"}</Button>
             <span id='comment-actions-dot'>·</span>
             <Button href='javascript:void(0);' onClick={this.onClickReply}>Reply</Button>
             {delete_if_user}
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
            var content = this.state.value;
            if (this.props.type === 'reply') {
                content = this.props.replyto + ' ' + content;
            }

            posts[post_index].comments.push({'name': 'John Doe', 'img': './assets/profile_img.jpg', 'content': content});
            localStorage.posts = JSON.stringify(posts);
         }

         this.setState({value: ''});
         this.props.post.forceUpdate();

         if (this.props.type === 'reply') {
            this.props.parent.setState({render_reply_area: false});
            this.props.parent.forceUpdate();
         }
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
               {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name} img={comment.img}>{comment.content}</Comment>)}
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
                    content: 'Hi, John. I\'m Jack',
                    liked: false}],
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
               <textarea rows='6'  placeholder="What's on your mind?" value={this.state.value} onChange={this.onChange} />
               <hr />
               <div id='actions'>
                  <Button href='javascript:void(0);' onClick={this.onClick}>Post</Button>
               </div>
            </div>
         </div>);
   }
}

class ChatUser extends React.Component {
    constructor(props) {
        super(props);

        this.onClickName = this.onClickName.bind(this);
    }

    onClickName() {
        var event = {action : 'Clicked Chat User', // state.action,
                     context : 'From NewsFeed', // state.context,
                     name : this.props.name};
        var added = this.props.chat.addChat(this.props.name);
        return ((added) ? event : null);
    }

    render() {
       return (
          <div id='chat-user'>
             <img id='profile-pic' src={this.props.img} />
             <Button href='javascript:void(0)' onClick={this.onClickName}>{this.props.name}</Button>
          </div>
       )
    }
}

class Chat extends React.Component {
   constructor(props) {
       super(props);
       this.state = {chats: []};

       this.addChat = this.addChat.bind(this);
       this.removeChat = this.removeChat.bind(this);
   }

   addChat(name) {
        if (this.state.chats.includes(name)) {
            return false;
        }

        this.setState({'chats': [name].concat(this.state.chats)});
        this.forceUpdate();

       return true;
   }

   removeChat(name) {
       var chats = this.state.chats;
       var index = chats.indexOf(name);
       if (index > -1) {
          chats.splice(index, 1);
       }

       this.setState({'chats': chats});
   }

   render() {
      var chats = []
      this.state.chats.forEach((name, index, array) => {
          chats.push(<ChatWindow key={index} name={name} destroy={this.removeChat} />);
      });
      return (
         <div id='chat-container'>
            <div id='chat-window-container'>
               {chats}
            </div>
            <div id='chat'>
               <ChatUser chat={this} img='./assets/profile_img.jpg' name='Jack Roe' />
               <ChatUser chat={this} img='./assets/profile_img.jpg' name='Jim Mend' />
            </div>
         </div>
      );
   }
}

class ChatWindow extends React.Component {
   constructor(props) {
       super(props);
       this.state = {value: '', name: ''};

       this.onKeyPress = this.onKeyPress.bind(this);
       this.destroyWindow = this.destroyWindow.bind(this);
   }

   onKeyPress(e) {
       if (e.key === 'Enter') {
           if(this.state.value === '') {
              return;
           }

           var outgoing_messages_list = JSON.parse(localStorage.outgoing_messages);
           var outgoing_messages_user = [];
           if (outgoing_messages_list) {
               outgoing_messages_user = outgoing_messages_list[this.props.name];
               if (!outgoing_messages_user) {
                   outgoing_messages_user = [];
               }
               outgoing_messages_user.push(this.state.value);

               outgoing_messages_list[this.props.name] = outgoing_messages_user;
               localStorage.outgoing_messages = JSON.stringify(outgoing_messages_list);
           }

           this.setState({value: ''});
       }
   }

   destroyWindow() {
       var event = {action : 'Closed Chat',
                    context : 'From NewsFeed', // state.context,
                    name : this.props.name};
       this.props.destroy(this.props.name);
       return event;
   }

   render() {
      if (!localStorage.incoming_messages || !localStorage.outgoing_messages) {
         resetChat();
      }

      var incoming_messages_list = JSON.parse(localStorage.incoming_messages)[this.props.name];
      var incoming_messages = [];
      if (incoming_messages_list) {
         for (var i = 0; i < incoming_messages_list.length; i++) {
            incoming_messages.push(<p id='chat-left' key={i}>{incoming_messages_list[i]}</p>);
         }
      }

      var outgoing_messages_list = JSON.parse(localStorage.outgoing_messages)[this.props.name];
      var outgoing_messages = [];
      if (outgoing_messages_list) {
         for (var i = 0; i < outgoing_messages_list.length; i++) {
            outgoing_messages.push(<p id='chat-right' key={i}>{outgoing_messages_list[i]}</p>);
         }
      }

      return (
         <div id='chat-window'>
            <div id='chat-header'>
               <a id='chat-name' href='#'>{this.props.name}</a>
               <Button id='chat-close' href='javascript:void(0)' onClick={this.destroyWindow}>&#10005;</Button>
            </div>
            <div id='chat-content'>
               {incoming_messages}
               {outgoing_messages}
            </div>
            <input id='new-message' type='text' placeholder='Type a message'
               rows='1' cols='65' onKeyPress={this.onKeyPress}
               onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}
               autoComplete='off' />
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
    
//Turn the querystring into a JSON object
  urlqueryStringToJSON() {
            const {search} = this.props.location;
            var pairs= search.slice(1).split('&');
            var result = {};

            pairs.forEach(function(pair){
                    pair = pair.split('=');
                    result[pair[0]] = decodeURIComponent(pair[1] || '');
                });
      
               return JSON.parse(JSON.stringify(result));
  }
 
 
    //Defines global variables
    getChildContext(){
         //Get the url parameters 
        const {session} = this.urlqueryStringToJSON();
       // const {change}="Hello"
        const current_session = {session};
        return {session: current_session.session,NewsFeed:true,Timeline:false};     
    }
     
   render() {  
       //TODO Delete asd this variable is accessed for debugging purposes only 
      const {session_id} = this.urlqueryStringToJSON();
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
                   <li>
                       <h3>Session_id:{session_id}</h3>
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

//Defines the types of pbjects that getChildContext returns.
App.childContextTypes = {
    session: PropTypes.string,
    NewsFeed: PropTypes.bool,
    Timeline: PropTypes.bool,
  
};

export default App;