import React from 'react'
import ReactDOM from 'react-dom'
import {indexPosts} from '../utilities.js'

import Button from './Button.jsx'
import AudienceMenu from './AudienceMenu.jsx'
import PostArea from './PostArea.jsx'
import Popup from './Popup.jsx'

class NewPostArea extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {value: '',
                    audience: 'public',
                    renderUploadPopup: false};
      this.onChange = this.onChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.onChangeAudience = this.onChangeAudience.bind(this);
   }

   onClick(img) {
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
                 comments: [],
                 audience: this.state.audience};
       
     localStorage.setItem('posts', JSON.stringify([post].concat(posts)));
     indexPosts();
     PostArea.update();
     this.state.value = '';

     return event;
   }

   onChange(e) {
      this.setState({value: e.target.value});
   }

   onChangeAudience(audience) {
      this.setState({audience: audience});

      var settings = JSON.parse(localStorage.getItem('settings'));
      var audience_settings = settings["post_audience_settings"][0];
   }

   render() {
        var uploadPopup = (
         <Popup title="Upload photo/video"
            destroy={(cancel=false) => {
              this.setState({renderUploadPopup: false});
            }}
            okay={() => {

            }}
            cancel={() => {}}>
          <a onClick={() => {this.onClick(this.img_0)}}>
          <img src='/assets/profile_img.jpg'
            style={{width: 60, height: 60}}
            ref={(img) => {this.img_0 = img}} />
          </a>
          <p>Me.jpg</p>
          <img src='/assets/profile_img.jpg' style={{width: 60, height: 60}} />
        </Popup>);

      return (
         <div id='new-post-area'>
            <div id='new-post-area-content'>
               <textarea rows='6'  placeholder="What's on your mind?" value={this.state.value} onChange={this.onChange} />
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