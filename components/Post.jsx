import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Menu from './Menu.jsx'
import Popup from './Popup.jsx'
import SuggestionPopup from '../adaptations/Suggestion.jsx'
import Automation from '../adaptations/Automation.jsx'
import Chat from './Chat.jsx'

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true,
            name: '',
            context: 'From NewsFeed',
            action: '',
            value: '',
            showPostWhenHidden: false,
            renderSuggestion:false,
        };

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickShare = this.onClickShare.bind(this);
        this.onClickLike = this.onClickLike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onClickHide = this.onClickHide.bind(this);
        this.onClickUndo = this.onClickUndo.bind(this);
        this.show = this.show.bind(this);
    }

    componentWillMount(){
        //Set a time on when to display the Suggestion. 
        setTimeout(()=>this.show(),2000)
    }

    //Show the Suggestion
     show(){
         this.setState({
             renderSuggestion:true
         })
         
       
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

    onClickHide() {
        var posts = JSON.parse(localStorage.getItem('posts'));
        // TODO: Implement
        // When hide is clicked, the post should be replaced with a dismissable box saying "You won't see this post in News Feed"
        // This includes an undo button, and several snooze/report options that might be unneccesary
    }

    actions(adaptMethod) {
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

            // console.log("The delete button adaptation is",adaptMethod.deletepost)
            //Keep an array where I specify index and just loop  
            return(
                <div id='actions'>
                    <Button href='javascript:void(0);' onClick={this.onClickLike} adapt={adaptMethod.likepost}>{like_text}</Button>
                    <a href='javascript:void(0);' onClick={this.onClickComment}>Comment</a>

                    <Button href='javascript:void(0);' onClick={this.onClickDelete} adapt={this.props.index===2?adaptMethod.deletepost:null}>Delete</Button>
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


    onClickUndo(){
        var event = {
            render: false,
            action: 'Undo Delete Post',
            context: this.state.context,
            name: this.props.name + '\'s Post',
            showPostWhenHidden: true, 
        };

        this.setState(event);

        return event;

    }

    renderPost(comments,post_title) {
        if(this.props.adapt.deletepost==='auto'&& this.props.index===2 && !this.state.showPostWhenHidden){
            return(
               < Automation Undobutton="Undo" label="This post was automatically deleted" onUndoClick={this.onClickUndo} />
            )
        } else{
            
            //Suggestion adaptation for the delete method.
            var Suggestion_Popup;
            if(this.props.adapt.deletepost==='sugst' && this.props.index === 2){
                
                {/*TO DO: Delete post on click of'OK' and record edb event*/}
                
                var Suggestion_Popup=(
                    <SuggestionPopup title="Suggestion" allow={()=>{
                            
                            
                            var event={
                                render:false,
                                action: 'Followed and agreed with Suggestion',
                                context: this.state.context,
                                name: this.props.name+'\'s Post: '+this.props.children,
                                renderSuggestion:false
                            }
                            this.setState(event)
                            
                            
                            
                            return event
                            
                        }}  
                        
                        destroy={()=>{
                        
                            var event={
                                render:false,
                                action:'Rather Not follow the Suggestion',
                                context: this.state.context,
                                name: this.props.name+'\'s Post: '+this.props.children,
                                renderSuggestion:false
                            }
                            this.setState(event)
                            
                            return event
                            
                        }}>
                      
                        <label>
                            I think you should delete {post_title}'s Post that states  "{this.props.children}."
                        </label>
                    </SuggestionPopup> ) }
            
            return(
                <div>
                    <div id='post-info'>
                        <img id='post-pic' src={this.props.img} />
                        <div id='post-text'>
                            <a href='#' id='post-name'>{post_title}</a>
                            <p id='post-time'>1 hr</p>
                        </div>
                        <Menu icon='horiz'>
                            <Button>Hide post</Button>
                            { (this.props.name != "John Doe") ? <Button>Unfollow {this.props.name}</Button> : null }
                        </Menu>
                    </div>
                    <p>{this.props.children}</p>
                    <hr />
                  
                    {this.actions(this.props.adapt)}
                    <hr />
                    {comments.map((comment, i) => <Comment post={this} index={this.props.index} key={i} commentindex={i} name={comment.name} img={comment.img}>{comment.content}</Comment>)}
                    <NewCommentArea type='post' index={this.props.index} post={this} />

                    {this.state.renderSuggestion ?Suggestion_Popup:null}
                    
                </div>
            )
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

        const Children = this.props.children

        return(
            <div id='post'>
                <div id='post-content'> 
                    <p>{/*this.props.children*/}</p> 
                    {this.renderPost(comments,post_title)}
                </div>
            </div>);
    }
}

export default Post;