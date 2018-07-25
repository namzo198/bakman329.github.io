import React,{Component} from 'react';
import Header from './header.jsx'


class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


handleChange(email) {
   this.setState({value: email.target.value});
 }

 handleSubmit(email) {
  //alert('A Email was added: ' + this.state.value);
   email.preventDefault();
 }
render(){
    
return (
<div id="container">
    <Header/>
  <div id="wrapper_left">
    <ul id="info_left">
      <li> <a href="javascript:void(0)"> Privacy </a> </li>
      <li > <a  href="javascript:void(0)"> Blocking  </a> </li>
    </ul>
  </div>
  <div className="divider" > </div>
  <div id="wrapper_right">
    <div>
    <h2 id = "right_header"> Manage blocking </h2>
    </div>
  <hr/>
<br/>
  <div id="right_top">
    <span className="righttop_label"> Restricted List </span>
    <a className="right_link" href="#"> Edit List </a>
        <div className = "righttop_text"> When you add a friend to your Restricted list, they won't see posts on Facebook that you share to Friends only.
      They may still see things that you share to Public or on a mutual friend's timeline, and posts that they're tagged in.
       Facebook doesn't notify your friends when you add them to your Restricted list. <a href="#">Learn more</a>
      </div>
</div>
<hr/>

  <div id="right_bottom">
    <span className="rightbottom_label"> Block users </span>
    <div className= "rightbottom_text"> Once you block someone, that person can no longer see things you post on your timeline, tag you, invite
      you to events or groups,start a conversation with you, or add you as a friend.
      Note: Does not include apps, games or groups you both participate in.
    </div>
    <div id="right_bottom_form">
      <form onSubmit={this.handleSubmit}>
        <label> Block users
          <input id = "text" type="text" placeholder="Add name or email" email={this.state.value} onChange={this.handleChange} />
        </label>
        <input id="submit" type="submit" value="Block" />
        <br/>
      </form>
    </div>
  </div>
</div>
</div>

  );
 }
}

export default Block;