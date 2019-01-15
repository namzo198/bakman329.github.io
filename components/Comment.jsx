import React from 'react';
import ReactDOM from 'react-dom';
import {getProfilePic} from '../utilities.js'

import Button from './Button.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import ProfileLink from './ProfileLink.jsx'

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
       if (this.props.name === 'Alex Doe') {
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

    createProfileLinks(text) {
      let users = JSON.parse(localStorage.users);
      let name_matches = {}
      users.forEach((user) => {
        name_matches[user.name] = [];
      });

      for (let i = 0; i < Object.keys(name_matches).length; i++) {
        let match_i = text.indexOf(Object.keys(name_matches)[i]);
        while(match_i > -1) {
          name_matches[Object.keys(name_matches)[i]].push(match_i);
          match_i = text.indexOf(Object.keys(name_matches)[i], match_i + 1);
        }
      }

      let matches_list = [];
      for (var i = 0; i < Object.keys(name_matches).length; i++) {
        let matches = name_matches[Object.keys(name_matches)[i]];
        matches.forEach((match) => {
          matches_list.push([Object.keys(name_matches)[i], match]);
        });
      }

      matches_list.sort((a, b) => {
        return a[1] - b[1];
      });

      let content = [];
      let last_index = 0;
      matches_list.forEach((match, index) => {
        // content.push(text.substr(match[1], match[0].length));
        content.push(text.substr(last_index, match[1] - last_index));
        content.push(<ProfileLink name={match[0]} key={index} />);
        last_index = match[1] + match[0].length;
      });
      if (matches_list.length != 0) {
        let last_match = matches_list[matches_list.length - 1];
        content.push(text.substr(last_match[1] + last_match[0].length));
      }

      if (content.length == 0) {
        content = [text];
      }

      return content;
    }

    render() {
       return (
       <div id='comment'>
          <img id='comment-profile-pic' src={getProfilePic(this.props.name)} />
          <div id='comment-content'>
             <span  id="comment-name"><ProfileLink name={this.props.name} /></span>
             <p>{' '}{this.createProfileLinks(this.props.children)}</p>
             <br />
             {this.actions()}
          </div>
          {this.replyArea()}
       </div>);
    }
}

export default Comment;