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
                pathname:'/settings_profile/overview',
                    state:{fromNewsFeed:true}}}><img id='profile-pic' src='../assets/profile_img.jpg'/><span>John Doe</span></Link>
                    
          <div id='header-text'>
            <p><Link to={{
                pathname:'/settings_profile/overview',
                    state:{fromNewsFeed:true}}}><span>Home</span></Link>
            </p> 
                 
            <p>Find Friends</p>
            
            <p><Link to={{
               pathname:'/settings_general/blockInvite',
               state:{fromHeader:true}}}><span>Settings</span></Link>
            </p>
            
          </div>
        </div>
      </header>
    );
  }
}

export default Header;