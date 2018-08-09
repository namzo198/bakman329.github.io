import React,{Component} from 'react';


class General extends Component {

render() {
  return (

    <div id="wrapper_right">
      <div className = "settings_right">
      <div>
      <h2 className = "right_header"> General Account Settings </h2>
    </div>
    <hr/>

    <div id="right_top">
      <span className="righttop_label"> Name </span>
      <span className = "righttop_label_content"> John Doe </span>
      <a className="right_link" href="#"> Edit  </a>
    </div>
    <hr/>

    <div id="right_top">
      <span className="righttop_label"> Username </span>
      <span className = "righttop_label_content"> facebook.com/johndoe </span>
      <a className="right_link" href="#"> Edit  </a>
    </div>
    <hr/>

    <div id="right_top">
      <span className="righttop_label"> Contact </span>
      <span className = "righttop_label_content"> Primary: johndoe@gmail.com </span>
      <a className="right_link" href="#"> Edit  </a>
    </div>
    <hr/>

    <div id="right_top">
      <span className="righttop_label"> Ad Contact </span>
      <span className = "righttop_label_content"> johndoe@gmail.com </span>
      <a className="right_link" href="#"> Edit  </a>
    </div>
    <hr/>


    <div id="right_top">
      <span className="righttop_label"> Manage Account </span>
      <span className = "righttop_label_content_1"> Modify your legacy contact settings or deactivate your account. </span>
      <a className="right_link" href="#"> Edit  </a>
    </div>
    <hr/>

    <div id="right_top">
      <span className="righttop_label"> Identity Confirmation </span>
      <span className = "righttop_label_content_1"> Confirm your identity to do things such as run ads with political content. </span>
      <a className="right_link" href="#"> View  </a>
    </div>
    <hr/>


</div> </div>



  );
 }
}

export default General;