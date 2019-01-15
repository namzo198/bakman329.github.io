import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to={{
            pathname:'/',
            state:{fromHeader:true}}}><h1 id="logo">fakebook</h1>
        </Link>
        
        <div id='user'>
          <Link to={{
                pathname:'/profile/Alex_doe',
                    state:{fromNewsFeed:true}}}><img id='profile-pic' src='/assets/users/alex_profile_img.jpg'/><span id='header-text'>  Alex</span></Link>
                    
                    
           
          <div id='header-text'>
           
            <p><Link to={{
                pathname:'/',
                    state:{fromNewsFeed:true}}}><span>Home</span></Link>
            </p> 
                 
            <p>Create</p>
            
             <p>
               <img id='profile-pic' src='/assets/findfriends.png'/> 
            </p>
            
             <p>
               <img id='profile-pic' src='/assets/messages.png'/> 
            </p>
            
             <p>
               <img id='profile-pic' src='/assets/notifications.png'/> 
            </p>
            
            <p>
               <img id='profile-pic' src='/assets/quick_help.png'/> 
            </p>
            
            <p>
              <Link to={{
               pathname:'/settings_general/blockInvite',
               state:{fromHeader:true}}}>
               <img id='profile-pic' src='/assets/settings.png'/>
               </Link>
              </p>
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;