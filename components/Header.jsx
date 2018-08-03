import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 id="logo">fakebook</h1>
        <div id='user'>
          <img id='profile-pic' src='../assets/profile_img.jpg' />
          <div id='header-text'>
            <p>John Doe</p>
            <p>Home</p>
            <p>Find Friends</p>
            <p><Link to={{
                pathname:'settings_general/blocking',
                start:{fromHeader:true}}}>Settings</Link></p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;