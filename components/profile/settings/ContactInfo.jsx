import React,{Component} from 'react';
import Button from '../../Button.jsx';
import EditInfoDisplay from './contactDisplays/EditInfoDisplay.jsx'
import ExistingInfoDisplay from './contactDisplays/ExistingInfoDisplay.jsx'
import AddInfoDisplay from './contactDisplays/AddInfoDisplay.jsx'
import Automation from '../../../adaptations/Automation.jsx'
import AutomationBoilerplate from '../../../adaptations/Automation/AutomationBoilerplate.jsx'
import {HighlightBoilerplate} from '../../../adaptations/Highlight/HighlightBoilerplate.jsx'
import {getParsed,addToLocalStorageObject,saveVisitedAdaptation,registerEvent, saveContactInfo} from '../../../utilities.js'

class ContactInfo extends Component {
  constructor(props){
    super(props)
     
   let adaptation = getParsed('adaptations')
   let existingInformation = getParsed('contactInfo')[this.props.user];
   let adaptationVisited = getParsed("visited");
   
    this.state = {
      adapt:adaptation['contact_Info'], 
      adapt_basic:adaptation['basic_Info'],     
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

      BasicMobileAdded: existingInformation['mobile'] !== undefined? true: false,
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
      renderContactAuto:false,    
      renderBasicAuto:false,
      unhide_addedinfo:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickToggle = this.onClickToggle.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
     
    //Contact Info
    this.onClickUndoContact_Auto = this.onClickUndoContact_Auto.bind(this);
    this.onClickOkContact_Auto = this.onClickOkContact_Auto.bind(this);
      
    //Basic Info
    this.onClickUndoBasic_Auto = this.onClickUndoBasic_Auto.bind(this);
    this.onClickOkBasic_Auto = this.onClickOkBasic_Auto.bind(this);
      
    this.visitedAdaptation = this.visitedAdaptation.bind(this);
    this.display = this.display.bind(this);
 
  }

    componentWillMount(){
    
        
        if(!this.state.adaptationVisited["Contact_Info"]["automation"]&&this.state.adapt === 'auto' && this.props.user === 'alex_doe'){
            this.setState({
                email:'alexdoe@gmail.com',
                BasicEmailAdded:true,
                renderContactAuto:true
            })
        }
        
         if(!this.state.adaptationVisited["Basic_Info"]["automation"]&&this.state.adapt_basic === 'auto' && this.props.user === 'alex_doe'){
            this.setState({
                //email:'alexdoe@gmail.com',
               // BasicEmailAdded:true,
                renderBasicAuto:true
            })
        }
    }
  
  handleChange(event) {
    /*Capture any of the user contact and basic information input*/
    event.preventDefault();
   
    const target = event.target;
    const value = target.value.trim();  
    const name = target.name;
    this.setState({[name]: value}); 
  }

  regex(wordtomatch) {
    /*Discern between the many contact and basic information attributes*/
    var regex =/(Mobile|Address|Email|Key|Websites|Social|Dob|Year|Gender|Interest|Language|Religious|Political)/;
    var inputfieldname = wordtomatch.match(regex)[1];
    return inputfieldname;  
  }

   visitedAdaptation(name){ 
      this.state.adaptationVisited["Contact_Info"][name] = true
      addToLocalStorageObject("visited",this.state.adaptationVisited)
    }
    
  onClickSave(infoAdded) {
    var inputfieldname = this.regex(infoAdded);
    var inputfieldname_lwrcse = inputfieldname.toLowerCase();
    var add = 'Add' + inputfieldname + 'Info';
    //var updateinfo;
    var event;
   
    /*when user tries to saves without any input..go back request to 'Add Info ...' */
    if( this.state[inputfieldname_lwrcse] === undefined || this.state[inputfieldname_lwrcse] === "") {
        
         this.setState(prevState => ({
            [add]: prevState.add,
            edit:false
          }));
        
          registerEvent(`Basic ${inputfieldname} Info`,`Tried to submit empty value/Edited and removed the ${inputfieldname}`,"Contact Information")
        
    } else {
      /*when user saves with new input*/

        registerEvent(`Basic ${inputfieldname} Info`,`Added new/edited ${inputfieldname}, input was: ${this.state[inputfieldname_lwrcse]} `,"Contact Information")
    
          this.setState(prevState => ({
            backup: this.state[inputfieldname_lwrcse],
            [infoAdded]: !prevState.infoAdded
          }));
        
        saveContactInfo(this.props.user,inputfieldname_lwrcse, this.state[inputfieldname_lwrcse]);
    }
    
    if(this.props.user === 'alex_doe'){
         
            //For the highlight adaptation 
            if(!this.state.adaptationVisited["Contact_Info"]["highlight"] && this.state.adapt === "high" && infoAdded === "BasicEmailAdded"){

                this.setState({
                  adapt: "none",
              })

               this.visitedAdaptation("highlight")  
                 HighlightBoilerplate("Contact_Info");
            } 

              if(!this.state.adaptationVisited["Basic_Info"]["highlight"] && this.state.adapt_basic === "high" && infoAdded === "BasicPoliticalAdded"){

              this.setState({
                  adapt_basic: "none",
              })
             HighlightBoilerplate("Basic_Info");
              
            }  
      
    }

  }


  onClickCancel(buttonname) {
    
    var inputfieldname = this.regex(buttonname)
    var inputfieldname_lwrcse = inputfieldname.toLowerCase();

    // When the edit button is pressed and the changes are cancelled
    if(this.state.edit) {
        var basic = 'Basic'+inputfieldname+'Added';
       
           this.setState(prevState => ({
               [inputfieldname_lwrcse]: this.state.contactInfoStored[inputfieldname_lwrcse],
               [basic]: !prevState.basic,
               edit: false
            }));
    } else {
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

    this.setState(prevState => ({
      [buttonname]: false,
      [add]: true,
      edit: true
    }));
  }
 

  onClickOkContact_Auto() {
   

      this.setState({
       renderContactAuto: false,
      });
      
  }

  onClickOkBasic_Auto() {
      
      this.setState({
        renderBasicAuto: false,
        BasicPoliticalAdded:false,
      });
      
   
  }

 onClickUndoContact_Auto() {

    this.onClickSave("BasicEmailAdded")
   
    this.setState({
        email:'ladiesman69@yahoo.com',
        BasicEmailAdded:true,
        renderContactAuto: false
    });
     
   
  }

onClickUndoBasic_Auto() {
   
    this. onClickSave("BasicPoliticalAdded")
   
    this.setState({
        political:'Moderate',
        BasicPoliticalAdded:true,
        renderBasicAuto: false
    });
     
   
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
        <ExistingInfoDisplay response = {this.state[info_lwercase]} onClick = {(e) => this.onClickEdit(basic_info)} infoName = {Info} adapt ={adapt} />
      )
    }else {
        
        if (this.state[add_info]){
        
            return (
              <EditInfoDisplay placeholder = {placeholder} infoName = {info_lwercase} onChange = {this.handleChange} value = {this.state[info_lwercase]} onClickSave = {(e) => this.onClickSave(basic_info,e)} onClickCancel = {(e)=>this.onClickCancel(add_info,e)} adapt ={adapt} />
            )
        
        }else {
     
            return (         
                <AddInfoDisplay add_request={add_request} onClickToggle = {()=>this.onClickToggle(add_info)}  adapt = {adapt} add_Info={add_info}/>
            );
        }
    }
   }

  render() {
      
       if (this.props.user === 'alex_doe') {
          let visited = JSON.parse(localStorage.featuresVisited);
          visited.withhold_info.address= true;
          visited.withhold_info.political= true;
          localStorage.setItem("featuresVisited", JSON.stringify(visited));
        } 
      
    return (
      
        <div className="contact_section">
            <div className="heading">Contact Information</div>
            {this.display("Mobile", "+ Add a mobile phone","enter mobile number")}
            {this.display("Address", "+ Add your address","Address,Town/City,Zip,Neighbourhood")}
             {this.display("Email", "+ Add an Email address","enter email address",!this.state.adaptationVisited["Contact_Info"]["highlight"] && this.state.adapt === 'high' && this.props.user === 'alex_doe'?this.state.adapt:null)}
          
          {this.props.user === 'alex_doe' && this.state.renderContactAuto && <AutomationBoilerplate  action={"Contact_Info_Adaptation -> email_address"} context={"Contact_Info"} label={'Your email address was automatically changed from "ladiesman69@yahoo.com" to "alexdoe@gmail.com"'}  onClickOK_Auto={this.onClickOkContact_Auto} onClickUnDo_Auto ={this.onClickUndoContact_Auto}/>}
            
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
          
          {this.display("Political", "+ Add your political views","", !this.state.adaptationVisited["Basic_Info"]["highlight"] && this.state.adapt_basic === 'high' && this.props.user === 'alex_doe'?this.state.adapt_basic:null)}

          
          
        {this.state.renderBasicAuto && this.props.user === 'alex_doe' && <AutomationBoilerplate  action={"Basic_Info_Adaptation -> political_view"}  context={"Basic_Info"} label={"Your political views were automatically removed from your profile page"}  onClickOK_Auto={this.onClickOkBasic_Auto} onClickUnDo_Auto ={this.onClickUndoBasic_Auto}/>}
            
        </div>
      
        
    );
  }
}

export default ContactInfo;