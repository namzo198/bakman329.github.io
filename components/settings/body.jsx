import React,{Component} from 'react';
import ContactInfo from './contact.jsx';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',displaycontactinfo:false};
   
    this.contactinfo = this.contactinfo.bind(this);
    this.update = this.update.bind(this);
    this.overview = this.overview.bind(this);
    this.workeduc = this.workeduc.bind(this);
  }


overview(){
  return(
    <div>
      <ul id = "info_left">
          <li id = "selector"> <a  href="javascript:void(0)"> Overview </a> </li>
          <li > <a  href="javascript:void(0)"> Work and education  </a> </li>
          <li> <a href="javascript:void(0)"> Places you've lived </a> </li>
          <li > <a  href="javascript:void(0)" onClick={this.update} className="basicInfo-contact"> Contact and basic info  </a> </li>
          <li> <a href="javascript:void(0)"> Details about you </a> </li>
          <li > <a  href="javascript:void(0)"> Life events  </a> </li>
        </ul>
    </div>
  );
}

workeduc(){

  return(
    <div className = "info_right">
      <ul className = "right_tags">
        <li> <a  href="javascript:void(0)"> Add a workplace </a>
        <div className = "symbol_tags">
        </div>
      </li>
        <hr/>

        <li> <a  href="javascript:void(0)"> Add a school/university </a>
        <div className = "symbol_tags"> <a href="#"> </a> </div> </li>
        <hr/>

        <li> <a  href="javascript:void(0)"> Add a address </a>
        <div className = "symbol_tags"> <a href="#"> </a> </div> </li>
        <hr/>

        <li> <a  href="javascript:void(0)"> Add a public key </a>
        <div className = "symbol_tags"> <a href="#"> </a> </div> </li>

        </ul>
          </div>

  );
}

contactinfo(){
  return(
    <div> 
          <ContactInfo/> 
    </div>
  );
}
 update(){
   this.setState({displaycontactinfo: true})
 }
    
render() {
  return (

<div id="page-container">
  <div className = "top_container" >
  <div className = "cover_photo"> </div>

  <div className = "top_options" >
    <ul className = "nav_top_options" >
      <li> <a href ="#"> Timeline </a> </li>
      <li> <a href ="#"> About </a> </li>
      <li> <a href ="#"> Friends </a> </li>
      <li> <a href ="#"> Photos </a> </li>
      <li> <a href ="#"> More </a> </li>
    </ul>

   </div>

   <div className = "profile_photo">
   <img src ='https://bakman329.github.io/assets/profile_img.jpg'/>
    </div>


</div>

    <div id = "info_wrapper" >
      <div className = "title">
        <img src = 'https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/IKrON1RLHfZ.png'/>
          <a href ="#"> About </a>
        </div>
            {this.overview()}
            {this.state.displaycontactinfo?this.contactinfo():this.workeduc()}



    </div>

</div>


  );
 }
}

export default Body;