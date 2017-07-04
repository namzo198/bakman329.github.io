import React from 'react';
import ReactDOM from 'react-dom';
import {CreateEvent} from './controller/databaseFunctions.js';

class Post extends React.Component {
    
    
    
   constructor(props){
      super(props);
      this.state = {
          render: true,
          name:"",
          context:"From NewsFeed",
          action:""};
      this.clickDelete = this.clickDelete.bind(this);
   }
    
    
    

   clickDelete(){
       
     this.setState({
         render:false,
         action:'Deleted',
         name:'John Doe\'s Post' //This needs to always be updated based on Post Id
     });
       
       
   }

   actions() {
       
      if (this.props.name == "John Doe") {
          
         return(
         <div id="actions">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <a href="javascript:void(0);" onClick={this.clickDelete}>Delete</a>
         </div>);
      }
      else {
         return(
         <div id="actions">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <a href="#">Share</a>
         </div>);
      }
   }

   render() {
      
      if (!this.state.render) {  
          
          //Create event variable
      var event = {
          action : this.state.action,
          details : this.state.context, object  : this.state.name
         };
          //Call CreateEvent function
         CreateEvent(event);
          
         return null;
      }

      return(
         <div id="test-post">
            <div id="test-content">
               <div id="test-info">
                  <img id="test-pic" src={this.props.img} />
                  <div id="test-text">
                     <a href="#" id="test-name">{this.props.name}</a>
                     <p id="test-time">1 hr</p>
                  </div>
               </div>
               <p>{this.props.children}</p>
               <hr />
               {this.actions()}
            </div>
         </div>);
   }
}

class App extends React.Component {
    
   render() {
      return (
         <div>
            <header>
               <h1 id="logo">fakebook</h1>
               <div id="user">
                  <img id="profile-pic" src="./assets/profile_img.jpg" />
                  <div id="header-text">
                     <p>John Doe</p>
                     <p>Home</p>
                     <p>Find Friends</p>
                  </div>
               </div>
            </header>
            <div id="page-content">
               <ul id="left-navagation">
                  <li>
                     <img src="./assets/profile_img.jpg" />
                     <a href="#">John Doe</a>
                  </li>
                  <li>
                     <img src="./assets/news_feed.jpg" />    
                     <a href="#">News Feed</a>
                  </li>
               </ul>
               <div id="post-area">
                  <Post name="John Doe" img="./assets/profile_img.jpg">Hi, I'm John.</Post>
                  <Post name="Jack Roe" img="./assets/profile_img.jpg">There is a party at my house tommorow.</Post>
               </div>
            </div>
         </div>
      );
   }
}

export default App;