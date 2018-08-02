import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import {CreateEvent} from '../controller/databaseFunctions.js';
import PropTypes from 'prop-types';
import {indexPosts, verifyLocalStorage, resetAll} from '../utilities.js'

import Button from './Button.jsx'
import Comment from './Comment.jsx'
import NewCommentArea from './NewCommentArea.jsx'
import PostArea from './PostArea.jsx'
import Chat from './Chat.jsx'

// Get the hashId session index.htm/:sessionid=theidisthisone

/**http://fakebook.usabart.nl/?session_id=a09eb84d555bb8d55510ef28a56a6f3d&changesub=auto&unsubstatus=auto&reportspam=auto&requestphoto=auto&timelinevisibility=auto&restrictuser=auto&blockevent=auto&chatoffline=auto&withholdcellphone=auto&withholdotherphone=auto&withholdim=auto&withholdstreet=auto&withholdinterest=auto&withholdreligion=auto&withholdpolitical=auto
*/

/**
http://fakebook.usabart.nl/?session=6c2cc0c1aefce7c1f00eb70cd2df88d8&hidestory=high&changesub=high&unsubfriend=high&unsubstatus=high&deletetimeline=high&reportspam=high&hidetimeline=high&untagphoto=high&requestphoto=high&tagvisiblity=high&timelinevisibility=high&blockuser=high&restrictuser=high&blockevent=high&blockapp=high&chatoffline=high&chatvisibility=high&customstatus=high&customphoto=high&catnewfriend=high&catoldfriend=high&withholdcellphone=high&withholdotherphone=high&withholdim=high&withholdstreet=high&withholdinterest=high&withholdreligion=high&withholdpolitical=high
*/

/**
http://localhost:8080/?session=6c2cc0c1aefce7c1f00eb70cd2df88d8&deletetimeline=high&liketimeline=high&chatoffline=high&withholdcellphone=high
*/

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    /* this.state = {
      deletepost: '',
      commentOnpost:'',
      chat:'',
      likepost:'',
      cellphone:'',
      renderSuggestion:false
    }; */

    this.getChildContext = this.getChildContext.bind(this);
  }

  componentDidMount() {
    // TODO: Replace this with router handling using props.location.search
    let userparams = this.getChildContext();

    let option_dict = {
      "session_id": userparams.session_id
    };

    let adaptations_dict = {
      "deletetimeline": userparams.deletetimeline,
      "liketimeline": userparams.liketimeline,
      "chatoffline": userparams.chatoffline,
      "withholdcellphone": userparams.withholdcellphone
    };

    // If any change is made to localstorage, refreshes after update
    let update = false;
    Object.keys(option_dict).forEach(function(key) {
      if (option_dict[key]) {
        localStorage.setItem(key, option_dict[key]);
        update = true;
      }
    });

    let adaptations = JSON.parse(localStorage.adaptations);
    Object.keys(adaptations_dict).forEach(function(key) {
      if (adaptations_dict[key]) {
        adaptations[key] = adaptations_dict[key];
        update = true;
      }
    });
    localStorage.setItem("adaptations", JSON.stringify(adaptations));
  
    if (update) {
      window.location.href = "/";
    }
  }

  // Turn the querystring into a JSON object
  urlqueryStringToJSON() {
    const {search} = this.props.location;
    let pairs = search.slice(1).split('&');
    let result = {};

    pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }

  // Defines global variables
  getChildContext() {
    // Get the url parameters from JSON String
    const {session_id,deletetimeline,liketimeline,chatoffline,withholdcellphone} = this.urlqueryStringToJSON();

    // const {change}="Hello"
    // Assign url parameters to local variables
    const current_session = {session_id,deletetimeline,liketimeline,chatoffline,withholdcellphone};

    // Assigns the local variables to the global variables 
    return {
      session_id: current_session.session_id,
      deletetimeline: current_session.deletetimeline,
      liketimeline: current_session.liketimeline,
      chatoffline: current_session.chatoffline,
      withholdcellphone: current_session.withholdcellphone,
      NewsFeed: true,
      Timeline: false
    };     
  }

  render() { 
    // Get the user preferences
    // let userparams=this.getChildContext();

    // TODO Delete as this variable is accessed for debugging purposes only 
    // const {session_id} = this.urlqueryStringToJSON();
    return (
        <div id='page-content'>
          <ul id='left-navagation'>
            <li>
              <img src='./assets/profile_img.jpg' />
              <Link to={{
                pathname:'/settings/overview',
                state:{fromNewsFeed:true}}}>John Doe</Link>
            </li>
            <li>
              <img src='./assets/news_feed.jpg' />    
              <a href='#'>News Feed</a>
            </li>
            <li>
              <a href='javascript:void(0)' onClick={() => { resetAll() }}>Reset Posts(DEBUG)</a>
            </li>
            <li>
              <h3>session_id: {localStorage.session_id}</h3>
            </li>
          </ul>
          <PostArea />
          <div id='chat-area'>
            <Chat />
          </div>
        </div>
    );
  }
}

// Defines the types of objects that getChildContext returns
// Defines the features that are to be adapted
NewsFeed.childContextTypes = {
  session_id: PropTypes.string,
  NewsFeed: PropTypes.bool,
  Timeline: PropTypes.bool,
  deletetimeline:PropTypes.string,
  chatoffline: PropTypes.string,
  liketimeline:PropTypes.string,
  withholdcellphone: PropTypes.string,
  BasicInfo:PropTypes.string,
};

export default NewsFeed;