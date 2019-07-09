import React from 'react'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import AudienceMenu from './AudienceMenu.jsx'
import PostArea from './PostArea.jsx'
import UploadPopup from './UploadPopup.jsx'

class NewPostArea extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {value: '',
                    photo: '',
                    audience: 'public',
                    renderUploadPopup: false};
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onClickPhoto = this.onClickPhoto.bind(this);
      this.onChangeAudience = this.onChangeAudience.bind(this);
   }

  onClickPhoto(photo) {
    this.setState({photo: photo, renderUploadPopup: false});
  }

   onClick() {
      var event = {
         action: 'Post Created',
         context: 'From NewsFeed',
         name: 'Alex Doe'
     };

     if (this.state.value === '' && this.state.photo === '') {
         return null;
     }

     var posts = JSON.parse(localStorage.getItem('posts'));
       
     var post = {name: 'Alex Doe',
                 img: './assets/users/alex_profile_img.jpg',
                 content: this.state.value,
                 photo: this.state.photo,
                 key: posts.length,
                 comments: [],
                 audience: this.state.audience,
                 new: true};
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     this.props.postarea.update();
     this.setState({value: '', photo: '', renderUploadPopup: false});

     return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   onChangeAudience(audience) {
      this.setState({audience: audience});
   }

   render() {
     var uploadPopup = <UploadPopup
       onClickPhoto={this.onClickPhoto}
       destroy={() => {this.setState({renderUploadPopup: false})}} />;

      var photo = (this.state.photo) ?
        <img src={this.state.photo}
          style={{width: 60, height: 60}} />
        : null;

      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'>
              <textarea rows='6' placeholder="What's on your mind, Alex?" value={this.state.value} onChange={this.onChange} />
              {photo}
              <hr />
               <div id='actions'>
                  <Button type="confirm" onClick={this.onClick}>Post</Button>
                  <Button type="cancel" onClick={() => {this.setState({renderUploadPopup: true})}}>Photo/Video</Button>
                  <AudienceMenu onChange={this.onChangeAudience} className="new-post-menu"
                    options={["public", "friends", "friends_except", "only_me", "more"]}
                    more={["specific_friends", "see_all"]}
                    see_all={["custom"]}
                    title="Who should see this?" />
               </div>
               {this.state.renderUploadPopup ? uploadPopup : null}
            </div>
         </div>);
   }
}

export default NewPostArea;