
import React,{Component} from 'react';


class TimelineandTagging extends Component {

render() {
  return (

    <div id="wrapper_right">
      <div className = "right_content">
      <div>
      <h2 className = "right_header"> Timeline and Tagging Settings </h2>
      </div>
    <hr/>
  <br/>
    <div id="right_top">
      <span className="righttop_label">Timeline </span>
      <div>
      <a className="right_link" href="#"> Edit</a>
          <div className = "righttop_text"> Who can post on your timeline? </div> <hb/></div>
          <div>
          <a className="right_link" href="#"> Edit</a>
              <div className = "righttop_text"> Who can see what others post on your timeline?</div> </div>

  </div>
  <hr/>

    <div id="right_bottom">
      <span className="rightbottom_label"> Tagging </span>
      <div>
      <a className="right_link" href="#"> Edit</a>
          <div className = "righttop_text"> Who can see posts that you're tagged in on your timeline?
 </div> <hb/></div>
          <div>
          <a className="right_link" href="#"> Edit</a>
              <div className = "righttop_text">When you're tagged in a post, who do you want to add to the audience of the post if they can't already see it?
 </div> <hr/></div>
      <div id="right_bottom">
        <span className="rightbottom_label"> Review </span>
        <div>
        <a className="right_link" href="#"> Edit</a>
            <div className = "righttop_text">Review posts that you're tagged in before the posts appear on your timeline?
            </div> <hb/></div>

              <div>
                <a className="right_link" href="#"> View As</a>
                <div className = "righttop_text">Review what other people see on your timeline
                </div> <hb/></div>

                <div>
                <a className="right_link" href="#"> Edit</a>
                    <div className = "righttop_text">Review tags that people add to your posts before the tags appear on Facebook?

                </div> <hr/></div>



    </div>
    </div>
  </div>
</div>


  );
 }
}

export default TimelineandTagging;