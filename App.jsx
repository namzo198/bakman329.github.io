import React from 'react';
import ReactDOM from 'react-dom';
import {CreateEvent} from './controller/databaseFunctions.js';
import  PropTypes from 'prop-types';
import {indexPosts, resetPosts, resetChat} from './utilities.js'

import Button from './components/Button.jsx'
import Comment from './components/Comment.jsx'
import NewCommentArea from './components/NewCommentArea.jsx'
import PostArea from './components/PostArea.jsx'
import Chat from './components/Chat.jsx'

//Get the hashId session index.htm/:sessionid=theidisthisone

/**http://fakebook.usabart.nl/?session_id=a09eb84d555bb8d55510ef28a56a6f3d&changesub=auto&unsubstatus=auto&reportspam=auto&requestphoto=auto&timelinevisibility=auto&restrictuser=auto&blockevent=auto&chatoffline=auto&withholdcellphone=auto&withholdotherphone=auto&withholdim=auto&withholdstreet=auto&withholdinterest=auto&withholdreligion=auto&withholdpolitical=auto
*/

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
       //TODO Delete as this variable is accessed for debugging purposes only 
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