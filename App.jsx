    import React from 'react';
    import ReactDOM from 'react-dom';
    import {Link} from 'react-router-dom'
    import {CreateEvent} from './controller/databaseFunctions.js';
    import  PropTypes from 'prop-types';
    import {indexPosts, resetPosts, resetChat} from './utilities.js'

    import Button from './components/Button.jsx'
    import Comment from './components/Comment.jsx'
    import NewCommentArea from './components/NewCommentArea.jsx'
    import PostArea from './components/PostArea.jsx'
    import Chat from './components/Chat.jsx'
    import BasicInfo from './components/settings/BasicInfo.jsx'


    //Get the hashId session index.htm/:sessionid=theidisthisone

    /**http://fakebook.usabart.nl/?session_id=a09eb84d555bb8d55510ef28a56a6f3d&changesub=auto&unsubstatus=auto&reportspam=auto&requestphoto=auto&timelinevisibility=auto&restrictuser=auto&blockevent=auto&chatoffline=auto&withholdcellphone=auto&withholdotherphone=auto&withholdim=auto&withholdstreet=auto&withholdinterest=auto&withholdreligion=auto&withholdpolitical=auto
    */

    /**
    http://fakebook.usabart.nl/?session=6c2cc0c1aefce7c1f00eb70cd2df88d8&hidestory=high&changesub=high&unsubfriend=high&unsubstatus=high&deletetimeline=high&reportspam=high&hidetimeline=high&untagphoto=high&requestphoto=high&tagvisiblity=high&timelinevisibility=high&blockuser=high&restrictuser=high&blockevent=high&blockapp=high&chatoffline=high&chatvisibility=high&customstatus=high&customphoto=high&catnewfriend=high&catoldfriend=high&withholdcellphone=high&withholdotherphone=high&withholdim=high&withholdstreet=high&withholdinterest=high&withholdreligion=high&withholdpolitical=high
    */

    /**
    http://localhost:8080/?session=6c2cc0c1aefce7c1f00eb70cd2df88d8&deletetimeline=high&liketimeline=high&chatoffline=high&withholdcellphone=high
    */


    class App extends React.Component {
       constructor(props) {
          super(props);
          if (!localStorage.posts) {
             resetPosts();
             location.reload();
          }

           this.state={
                userSession_id:'',
                deletepost: '',
               commentOnpost:'',
               chat:'',
               likepost:'',
               cellphone:'',
               renderSuggestion:false
            }

           this.getChildContext = this.getChildContext.bind(this);
          



       }

       componentWillMount(){
           let userparams = this.getChildContext();
           console.log('User Params '+userparams.Delete)

           this.setState({
               userSession_id:userparams.session_id,
               deletepost:userparams.Delete,
               chat:userparams.Chat,
               commentOnpost:'high',
               likepost:userparams.Like,
               cellphone:userparams.BasicInfo,
           })
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
          //Get the url parameters from JSON String
            console.log(this.urlqueryStringToJSON())
          const {session,deletetimeline,liketimeline,chatoffline,withholdcellphone} = this.urlqueryStringToJSON();


          // const {change}="Hello"
            //Assign url parameters to local variables
          const current_session = {session,deletetimeline,liketimeline,chatoffline,withholdcellphone};

             console.log("Current session "+current_session.deletetimeline)

            //Assigns the local variables to the global variables 
          return {
              session_id: current_session.session,
              Delete:current_session.deletetimeline,
              Like:current_session.liketimeline,
              Chat:current_session.chatoffline,
              BasicInfo:current_session.withholdcellphone,
              NewsFeed:true,
              Timeline:false,
              
          };     
        }
        
        
       

       render() { 
           //Get the user preferences
          // let userparams=this.getChildContext();


           //TODO Delete as this variable is accessed for debugging purposes only 
          //const {session_id} = this.urlqueryStringToJSON();
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
        
                        <p><Link to={{
                                  pathname:'settings/BlockInvite',
                                  search:'?blockevent=high&&blockapp=high',
                                  start:{
                                      fromNewsFeed:true, session:this.state.userSession_id, blockInfo:'high'}
                              }}>Settings</Link></p>
                      </div>
                   </div>
                </header>
                <div id='page-content'>
                   <ul id='left-navagation'>
                      <li>
                         <img src='./assets/profile_img.jpg' />
                         <Link to={{
                                  pathname:'/settings/BasicInfo',
                                  search:`?witholdbasicInfo=${this.state.cellphone}`,
                                  state:{fromNewsFeed:true, session:this.state.userSession_id, witholdbasicInfo:this.state.cellphone}
                              }}>John Doe</Link>
                      </li>
                      <li>
                         <img src='./assets/news_feed.jpg' />    
                         <a href='#'>News Feed</a>
                      </li>
                      <li>
                         <a href='javascript:void(0)' onClick={() => { resetPosts(); resetChat(); location.reload(); }}>Reset Posts(DEBUG)</a>
                      </li>
                       <li>
                           <h3>Session_id:{this.state.userSession_id}</h3>

                       </li>
                   </ul>
                   <PostArea toAdapt={this.state}/>
                   <div id='chat-area'>
                      <Chat toAdapt={this.state.chat}/>
                   </div>
                </div>
             </div>
          );
       }
    }

    //Defines the types of objects that getChildContext returns
    //Defines the features that are to be adapted
    App.childContextTypes = {
        session_id: PropTypes.string,
        NewsFeed: PropTypes.bool,
        Timeline: PropTypes.bool,
        Delete:PropTypes.string,
        Chat: PropTypes.string,
        Like:PropTypes.string,
        BasicInfo:PropTypes.string,

    };

    export default App;