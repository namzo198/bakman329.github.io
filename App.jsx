import React from 'react';

function clickDelete(e) {
   document.getElementById('test-post').remove();
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
                     <a href="#">John Doe</a>
                  </li>
                  <li>
                     <a href="#">News Feed</a>
                  </li>
               </ul>
               <div id="post-area">
                  <div id="test-post">
                     <div id="test-content">
                        <div id="test-info">
                           <img id="test-pic" src="./assets/profile_img.jpg" />
                           <div id="test-text">
                              <a href="#" id="test-name">John Doe</a>
                              <p id="test-time">1 hr</p>
                           </div>
                        </div>
                        <h3>Test post</h3>
                        <hr />
                        <div id="actions">
                           <a href="#">Like</a>
                           <a href="#">Comment</a>
                           <a href="#">Share</a>
                           <a  href="javascript:void(0);" onClick={clickDelete}>Delete</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default App;