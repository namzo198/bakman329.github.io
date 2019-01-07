import React,{Component} from 'react';
import Button from '../../Button.jsx';
import EditInfoDisplay from './contactDisplays/EditInfoDisplay.jsx'
import ExistingInfoDisplay from './contactDisplays/ExistingInfoDisplay.jsx'
import AddInfoDisplay from './contactDisplays/AddInfoDisplay.jsx'
import Automation from '../../../adaptations/Automation.jsx'
import {getParsed,addToLocalStorageObject,saveVisitedAdapatation} from '../../../utilities.js'

class ContactInfo extends Component {
  constructor(props){
    super(props)

    
      
       let adapatation = getParsed('adaptations')
       let existingInformation = getParsed('contactInfo')
       let adaptationVisited = getParsed("visited");
     
      
  
    
    this.state = {
      adapt:adapatation['contactInfo'], 
      adaptationVisited:adaptationVisited,
      contactInfoStored:existingInformation,   
      mobile:existingInformation['mobile'],
      address:existingInformation['address'],
      email:existingInformation['email'],
      key:existingInformation['key'],
      websites:existingInformation['websites'],
      social:existingInformation['social'],
      dob:existingInformation['dob'],
      year:existingInformation['year'],
      gender:existingInformation['gender'],
      interest:existingInformation['interest'],
      language:existingInformation['language'],
      religious:existingInformation['religious'],
      political:existingInformation['political'],

      AddMobileInfo:false,
      AddAddressInfo:false,
      AddEmailInfo:false,
      AddKeyInfo:false,
      AddWebsitesInfo:false,
      AddSocialInfo:false,
      AddDobInfo:false,
      AddYearInfo:false,
      AddGenderInfo:false,
      AddInterestInfo:false,
      AddLanguageInfo:false,
      AddReligiousInfo:false,
      AddPoliticalInfo:false,

      BasicMobileAdded:existingInformation['mobile'] !== undefined? true: false,
      BasicAddressAdded:existingInformation['address'] !== undefined? true: false,
      BasicEmailAdded:existingInformation['email'] !== undefined? true: false,
      BasicKeyAdded:existingInformation['key'] !== undefined? true: false,
      BasicWebsitesAdded:existingInformation['websites'] !== undefined? true: false,
      BasicSocialAdded:existingInformation['social'] !== undefined? true: false,
      BasicDobAdded:existingInformation['dob'] !== undefined? true: false,
      BasicYearAdded:existingInformation['year'] !== undefined? true: false,
      BasicGenderAdded:existingInformation['gender'] !== undefined? true: false,
      BasicInterestAdded:existingInformation['interest'] !== undefined? true: false,
      BasicLanguageAdded:existingInformation['language'] !== undefined? true: false,
      BasicReligiousAdded:existingInformation['religious'] !== undefined? true: false,
      BasicPoliticalAdded:existingInformation['political'] !== undefined? true: false,

      edit:false,
      renderAuto:false,
      unhide_addedinfo:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
    this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
    this.visitedAdaptation = this.visitedAdaptation.bind(this);
    this.display = this.display.bind(this);
 
  }

    componentWillMount(){

        if(!this.state.adaptationVisited["ContactInfo"]["automation"]&&this.state.adapt === 'auto'){
            this.setState({
                political:'Republican',
                BasicPoliticalAdded:true,
                renderAuto:true
            })
        }
    }
  
  handleChange(event) {
    /*Capture any of the user contact and basic information input*/
    event.preventDefault();
   
    const target = event.target;
    const value = target.value;
    const name = target.name;
   
    this.setState({[name]: value}); 
  }

  regex(wordtomatch) {
    /*Discern between the many contact and basic information attributes*/
    var regex =/(Mobile|Address|Email|Key|Website|Social|Dob|Year|Gender|Interest|Language|Religious|Political)/;
    var inputfieldname = wordtomatch.match(regex)[1];
    return inputfieldname;  
  }

   visitedAdaptation(name){ 
      this.state.adaptationVisited["ContactInfo"][name] = true
      addToLocalStorageObject("visited",this.state.adaptationVisited)
    }
    
  onClickSave(infoAdded) {
    var inputfieldname = this.regex(infoAdded);
    var inputfieldname_lwrcse = inputfieldname.toLowerCase();
    var add = 'Add' + inputfieldname + 'Info';
    //var updateinfo;
    var event;
    
    /*when user tries to saves without any input..go back request to 'Add Info ...' */
    if(this.state[ inputfieldname_lwrcse] ==='') {
      event = {
        action: infoAdded,
        context: 'Basic ' + inputfieldname + ' Contact Information Edited and removed/Tried to be submitted empty',
        name: 'Alex Doe'
      };
    
      /*updateinfo = {
        [inputfieldname_lwrcse]:this.state[inputfieldname_lwrcse],
        //[add]:this.state[add],
        //[infoAdded]:false
      };
        
        updateinfo = {
        [inputfieldname_lwrcse]: this.state[inputfieldname_lwrcse]}*/
        
      this.setState(prevState => ({
        [add]: prevState.add,
        edit:false
      }));
    }
    else {
      /*when user saves with new input*/
      event = {
        action: infoAdded,
        context: 'Basic ' + inputfieldname + ' Contact Information Added',
        name: 'Alex Doe'
      };
            
     /* updateinfo = {
        //[inputfieldname_lwrcse]: this.state[inputfieldname_lwrcse],
        //[add]: false,
        //[infoAdded]: !this.state[infoAdded]                   
      };
        
        updateinfo = {
        [inputfieldname_lwrcse]: this.state[inputfieldname_lwrcse]}*/

      this.setState(prevState => ({
        backup: this.state[inputfieldname_lwrcse],
        [infoAdded]: !prevState.infoAdded
      }));
    }
    
    //For the highlight adaptation 
    if(!this.state.adaptationVisited["ContactInfo"]["highlight"] && this.state.adapt === "high" && infoAdded === "BasicAddressAdded"){
       this.visitedAdaptation("highlight")   
    }
      
    this.state.contactInfoStored[inputfieldname_lwrcse] = this.state[inputfieldname_lwrcse] === ""?undefined:this.state[inputfieldname_lwrcse];
            
    addToLocalStorageObject('contactInfo',this.state.contactInfoStored)
    //localStorage.setItem('contactInfo', JSON.stringify(this.state.contactInfoStored));

    return event;
  }


  onClickCancel(buttonname) {
    var inputfieldname = this.regex(buttonname)
    var inputfieldname_lwrcse = inputfieldname.toLowerCase();

    // When the edit button is pressed and the changes are cancelled
    if(this.state.edit) {
      var basic = 'Basic'+inputfieldname+'Added';
      //var original_input =  JSON.parse(localStorage.getItem(inputfieldname_lwrcse))
       
      // If cancelled change is empty
      if(this.state[inputfieldname_lwrcse] !=='') {
        this.setState(prevState => ({
          [inputfieldname_lwrcse]: this.state.contactInfoStored[inputfieldname_lwrcse],
          [basic]: !prevState.basic,
          edit: false
        }));
      }

      // If cancelled change contains new/old info 
      if(this.state[inputfieldname_lwrcse] === '') {
        this.setState((prevState) => ({
          [inputfieldname_lwrcse]:this.state.contactInfoStored[inputfieldname_lwrcse],
          [basic]:!prevState.basic,
          edit:false
        }));
      }
    }
    else {
      // When cancel without before even saving any input
      this.setState(prevState => ({[buttonname]: prevState.buttonname}));
    }
  }

  onClickToggle(linkname) {
    /*Toggles between displaying the prompt for adding new info and the already input information*/
    this.setState(prevState => ({[linkname]: !prevState.linkname}));
  }


  onClickEdit(buttonname) {
    /*Enables user edit the already saved innput information*/
    var inputfieldname = this.regex(buttonname)
    var add = 'Add' + inputfieldname + 'Info';

    console.log('The edit button is ' + buttonname)
    this.setState(prevState => ({
      [buttonname]: false,
      [add]: true,
      edit: true
    }));
  }
 

  onClickUndo_Auto() {
    var event = {
      action: 'Undo Political Views set',
      context: 'In Contact Info, automation was declined with the clicking of Undo',
      renderAuto: false,
      BasicPoliticalAdded:false,
    };
    this.visitedAdaptation("automation")
    this.setState(event);
    return event;
  }

  onClickOk_Auto() {
    var event = {
      action: 'Automatically set political views were accepted',
      context: 'In Contact Info, automation was accepted with the clicking of OK',
      renderAuto: false
    }
    
    this.onClickSave("BasicPoliticalAdded")
    this.visitedAdaptation("automation")
    this.setState(event);
    return event;
  }


  display(Info,add_request,placeholder,adapt) {
    var basic_info = "Basic" + Info + "Added";
    var add_info = "Add" + Info + "Info";
    var info_lwercase = Info.toLowerCase();
    
   
    if(this.state[basic_info]){
      if(Info =='Social') {
        Info = "Social links"
      }
      
      if(Info =='Dob') {
        Info = "Date of birth"
      }
      
      if(Info =='Dob') {
        Info = "Year of Birth"
      }
        
    return (
        <ExistingInfoDisplay response = {this.state[info_lwercase]} onClick = {(e) => this.onClickEdit(basic_info)} infoName = {Info}/>
      )
    }else {
        
        if (this.state[add_info]){
        
            return (
              <EditInfoDisplay placeholder = {placeholder} infoName = {info_lwercase} onChange = {this.handleChange} value = {this.state[info_lwercase]} onClickSave = {(e) => this.onClickSave(basic_info,e)} onClickCancel = {(e)=>this.onClickCancel(add_info,e)}/>
            )
        
        }else {
        
            return (         
                <AddInfoDisplay add_request={add_request} onClickToggle = {()=>this.onClickToggle(add_info)} adapt = {adapt}  add_Info={add_info}/>
            );
        }
    }
   }

  render() {
      
    const shouldDisplayAutomation = this.state.renderAuto;
      
    return (
        <div className="contact_section">
        
        {shouldDisplayAutomation && <div id='except-warning'>
            <Automation Undobutton="Undo" Okbutton="Ok" onOkClick={this.onClickOk_Auto} label="Your political views were automatically set" onUndoClick={this.onClickUndo_Auto}/></div>}
            
         
          <div className="heading">Contact Information</div>
          {this.display("Mobile", "+ Add a mobile phone","enter mobile number")}
          {this.display("Address", "+ Add your address","Address,Town/City,Zip,Neighbourhood",!this.state.adaptationVisited["ContactInfo"]["highlight"]?this.state.adapt:"")}
          {this.display("Email", "+ Add an Email address","enter email address")}
          {this.display("Key", "+ Add a public key","Enter a PGP public key")}
          <br/>

          <div className="heading">Websites and social links</div>
          {this.display("Websites", "+ Add a website","enter a website")}
          {this.display("Social", "+ Add a social link","enter a social link")}
          <br/>

          <div className="heading">Basic Information</div>
          {this.display("Dob", "+ Add a date of birth", "enter a date of birth")}
          {this.display("Year", "+ Add a year of birth", "enter a year of birth")}
          {this.display("Gender", "+ Add a gender", "enter a gender")}
          {this.display("Languages", "+ Add a language", "")}
          {this.display("Interest", "+ Add who you're interested in", "")}
          {this.display("Religious", "+ Add your religious view", "")}
          {this.display("Political", "+ Add your political views", "")}
          
          
        
        </div>
    );
  }
}

export default ContactInfo;