import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import {resetAll} from '../utilities.js'

import PostArea from './PostArea.jsx'
import ProfileLink from './ProfileLink.jsx'

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO Delete as this variable is accessed for debugging purposes only 
    // const {session_id} = this.urlqueryStringToJSON();
    return (
        <div id='page-content'>
          <ul id='left-navagation'>
            <li>
              <img id="profile-pic" src='./assets/users/alex_profile_img.jpg' />
                 <ProfileLink name='Alex Doe' fromNewsFeed={true} />
            </li>
            
            {/* TODO make this link look like facebook's when we are on the newsfeed */}
            <li>
              <img id="profile-pic" src='./assets/news_feed.jpg' />
              <Link to='/'> <span id="left-navagation-words">News Feed</span></Link>
             </li>
              <li>
              <a href='javascript:void(0)' onClick={() => { resetAll() }}>Reset Posts(DEBUG)</a>
            </li>
            <li>
                {<h3>session_id: {localStorage.session_id}</h3>}
            </li>
          </ul>
          <PostArea />
        </div>
    );
  }
}

export default NewsFeed;