import React,{Component} from 'react';


class body extends Component {

render() {
  return (

    <div id="wrapper_right">
      <div className = "right_content">
      <div>
      <h2 className = "right_header"> Privacy Settings and Tools </h2>
      </div>
    <hr/>
  <br/>
    <div id="right_top">
      <span className="righttop_label">Your activity </span>
      <div>
      <a className="right_link" href="#"> Edit</a>
          <div className = "righttop_text"> Who can see your future posts? </div> <hb/>
        </div>
          <div>
          <a className="right_link" href="#"> Use Activity Log</a>
              <div className = "righttop_text"> Review all your posts and things you're tagged in</div> <hb/>
            </div>
            <div>
            <a className="right_link" href="#"> Limit Past Posts</a>
                <div className = "righttop_text"> Limit the audience for posts you've shared with friends of friends or Public?</div>
              </div>
</div>
  <hr/>

    <div id="right_bottom">
      <span className="rightbottom_label"> How people can find and contact you </span>
      <div>
      <a className="right_link" href="#"> Edit</a>
          <div className = "righttop_text">Who can send you friend requests?
          </div> <hb/></div>
          <div>
          <a className="right_link" href="#"> Edit</a>
              <div className = "righttop_text">Remember that your friends control who can see their friendships on their own timelines.
                If people can see your friendship on another timeline, they'll be able to see it in News Feed, search and other places on Facebook.
                If you set this to Only me, only you will be able to see your full friends list on your timeline. Other people will only see mutual friends.
              </div> <hb/>
  </div>
  <div>
  <a className="right_link" href="#"> Edit</a>
      <div className = "righttop_text">Who can look you up using the email address you provided?
      </div> <hb/></div>
      <div>
      <a className="right_link" href="#"> Edit</a>
          <div className = "righttop_text">Who can look you up using the phone number you provided?
          </div> <hb/></div>
          <div>
          <a className="right_link" href="#"> Edit</a>
              <div className = "righttop_text">Do you want search engines outside of Facebook to link to your Profile?
              </div> <hb/></div>
</div> </div> </div>
  );
 }
}
export default body;