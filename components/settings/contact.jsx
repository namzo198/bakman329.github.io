    import React,{Component} from 'react';
    import Button from '../Button.jsx';
    import Automation from '../../adaptations/Automation.jsx'

    class ContactInfo extends Component {
         constructor(props){
             super(props)
             
             this.state = {
                 adaptationMethod:'',
                 usersessionId:'',
                 
                 mobile:'',
                 address:'',
                 email:'',
                 key:'',
                 websites:'',
                 social:'',
                 dob:'',
                 year:'',
                 gender:'',
                 interest:'',
                 language:'',
                 religious:'',
                 political:'',
                 
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
                 
                 BasicMobileAdded:false,
                 BasicAddressAdded:false,
                 BasicEmailAdded:false,
                 BasicKeyAdded:false,
                 BasicWebsitesAdded:false,
                 BasicSocialAdded:false,
                 BasicDobAdded:false,
                 BasicYearAdded:false,
                 BasicGenderAdded:false,
                 BasicInterestAdded:false,
                 BasicLanguageAdded:false,
                 BasicReligiousAdded:false,
                 BasicPoliticalAdded:false,
                 
                 edit:false,
                 unhide_addedinfo:false,
                 ok_Auto:false,
             };
             
            this.handleChange = this.handleChange.bind(this);
            this.onClickSave = this.onClickSave.bind(this);
            this.onClickCancel = this.onClickCancel.bind(this);
            this.onClickToggle = this.onClickToggle.bind(this);
            this.onClickEdit = this.onClickEdit.bind(this);
            this.automation = this.automation.bind(this);
            this.onClickUndo= this.onClickUndo.bind(this);
            this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
            this.display = this.display.bind(this);
            
            
             
         }
        
    componentWillMount(){

            this.setState({
                 adaptationMethod:this.props.adapt,
                 userSessionId:this.props.userSession        
            })
     } 
    
    firstChar_Upper(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
        
    componentDidMount() {
         /*Display the info that might have already been input/changed  by user within current session*/
          var allContact_BasicInfo = ["mobile","address","email","key","websites","social","dob","year","gender","interest","language","religious","political"];
         
        // var getInfo = JSON.parse(localStorage.getItem(stored_info));
         allContact_BasicInfo.forEach( (stored_info) => {
             
             var getInfo = JSON.parse(localStorage.getItem(stored_info));
             
             if(getInfo != null && (getInfo[stored_info] !== '')){
             
                var to_uppercase =  this.firstChar_Upper(stored_info);
                var basic_added = 'Basic'+to_uppercase+'Added';
                var add_info = 'Add'+to_uppercase+'Info';
             
                this.setState({
                    [stored_info]:getInfo[stored_info],
                    [add_info]: getInfo[stored_info],
                    [basic_added]:getInfo[stored_info]
                 });
             }   
          });   
        }
        
        
      
       handleChange(event) {
            /*Capture any of the user contact and basic information input*/
             event .preventDefault();
           
            const target = event.target;
            const value = target.value;
            const name = target.name;
           
            this.setState({
                [name]: value
            }); 
         } 
    
     regex(wordtomatch){
          /*Discern between the many contact and basic information attributes*/
           var regex =/(Mobile|Address|Email|Key|Website|Social|Dob|Year|Gender|Interest|Language|Religious|Political)/;
           var inputfieldname = wordtomatch.match(regex)[1];
          return inputfieldname;  
       }

      onClickSave(infoAdded) {
           var inputfieldname = this.regex(infoAdded);
           var inputfieldname_lwrcse = inputfieldname.toLowerCase();
           var add = 'Add'+inputfieldname+'Info';
           var updateinfo;
           var event;
           
           /*when user tries to saves without any input..go back request to 'Add Info ...' */
             if(this.state[ inputfieldname_lwrcse] ===''){
                
                 event = {
                            action: infoAdded,
                            context: 'Basic '+inputfieldname+' Information Edited and removed/Tried to be submitted',
                            name: 'John Doe'
                        };
                 
                  updateinfo = {[inputfieldname_lwrcse]:this.state[inputfieldname_lwrcse],
                  [add]:this.state[add],
                  [infoAdded]:false
                }
                
                 this.setState(prevState => ({
                    [add]: prevState.add,
                     edit:false
                }));
                 
             }else{
                   
                 /*when user saves with new input*/
                  event = {
                            action: infoAdded,
                            context: 'Basic '+inputfieldname+' Information Added',
                            name: 'John Doe'
                        };
                        
                  updateinfo = {[inputfieldname_lwrcse]:this.state[inputfieldname_lwrcse],
                   [add]:false,
                   [infoAdded]:!this.state[infoAdded]                   
                 }
                 
                 this.setState(prevState=>({
                            backup:this.state[inputfieldname_lwrcse],
                            [infoAdded]: !prevState.infoAdded,

                 }));     
             }
           
          localStorage.setItem(inputfieldname_lwrcse,JSON.stringify(updateinfo));

           return event;
        }
        
        
        onClickCancel(buttonname) {
           
                var inputfieldname = this.regex(buttonname)
                var inputfieldname_lwrcse = inputfieldname.toLowerCase();
               
               //When the edit button is pressed and the changes are cancelled
               if(this.state.edit){
                   
                    var basic = 'Basic'+inputfieldname+'Added';
                    var original_input =  JSON.parse(localStorage.getItem(inputfieldname_lwrcse))
                   
                    //If cancelled change is empty
                   if(this.state[inputfieldname_lwrcse] !==''){
                    
                       this.setState( prevState =>({
                           [inputfieldname_lwrcse]:original_input[inputfieldname_lwrcse],
                           [basic]:!prevState.basic,
                            edit:false,
                       }));
                }
                   //If cancelled change contains new/old info 
               if(this.state[inputfieldname_lwrcse] ===''){

                       this.setState( (prevState) =>({
                         [inputfieldname_lwrcse]:original_input[inputfieldname_lwrcse],
                           [basic]:!prevState.basic,
                            edit:false,
                       }));
                 }

               
           }else{
               
                 //When cancel without before even saving any input
                this.setState(prevState => ({
                    [buttonname]: prevState.buttonname
                }));
           }
                    
        }


        onClickToggle(linkname) {
            
            /*Toggles between displaying the prompt for adding new info and the already input information*/
             this.setState(prevState => ({
                   [linkname]: !prevState.linkname
                }));  
        }

        
        onClickEdit(buttonname){
            
            /*Enables user edit the already saved innput information*/
            
            var inputfieldname = this.regex(buttonname)
            var add = 'Add'+inputfieldname+'Info';
            
            console.log('The edit button is '+buttonname)
            this.setState(prevState=>({
                    [buttonname]: false,
                     [add]:true,
                     edit:true,
                }));
        }

        onClickUndo(){

            var event = {
                action: 'Undo Political Views Set Post',
                unhide: true, 
            };

            this.setState(event);

            return event;
        }
        
        onClickOk_Auto(action){
        
            var event ={
            action: `Automatically set ${action} were/was accepted`,
            auto_OK: true,
            }
           this.setState(event);
           return event;
        }
        
        automation(){
    
            return (
                <div>
                    <p>{`Political Views:${this.state.political}`}</p>
                    <Automation Undobutton="Undo" label="Your political views were automatically set" onUndoClick={this.onClickUndo}  onOkClick={(e) => this. onClickAuto_Ok('BasicPoliticalView',e)} Okbutton={'Ok'}/>
                </div>
               ) 
        }
        
        
        display(Info,add_request,placeholder){
            var basic_info = "Basic"+Info+"Added";
            var add_info = "Add"+Info+"Info";
            var info_lwercase = Info.toLowerCase();
            
            if(this.state[basic_info]) {
               
                if(Info =='Social'){
                    Info = "Social links"
                }
                
                if(Info =='Dob'){
                    Info = "Date of birth"
                }
                
                if(Info =='Dob'){
                    Info = "Year of Birth"
                }
                
                
                return(
                        <div className = "details_2">

                               <div className = "edit">
                                <img src = '../../assets/edit_icon.png'/>
                                    <Button href ="javascript:void(0)" onClick = {(e) => this.onClickEdit(basic_info)}> Edit  </Button>
                               </div>

                          <div className = "response">
                                <label> {this.state[info_lwercase]} </label>
                          </div>

                             <li>  <label className="addedinfo_color" > {Info} </label> </li>
                          </div>
                    );

            } else {
                
                
                if(this.state[add_info]){
                 
                  return(  
                      
                      <div className = "display_inputform">
                        <input type = "text"
                        placeholder = {placeholder}
                        name = {info_lwercase}
                        onChange = {
                            this.handleChange
                        }
                        value = {
                            this.state[info_lwercase]
                        }/> 
                        <Button href = 'javascript:void(0);'
                        onClick = {
                            (e) => this.onClickSave(basic_info,e)
                        }
                        className = "saveButton" > Save Changes </Button>

                        <Button href = 'javacript:void(0);'
                        onClick = {(e)=>this.onClickCancel(add_info,e)}> Cancel </Button> 
                     </div>
                    )
                }else{
                    
                  return( 
                       <div className = "details_2">
                          <li>  <Button href="#" onClick = {()=>this.onClickToggle(add_info)}> {add_request} </Button> </li>
                       </div>
                  )
                }
                
                
            }
                
        }

    render() {
     return (
        <div className = "contact_wrapper" >
            <div className = "contact_section">
                <div className = "heading" > Contact Information </div>

                   {this.display("Mobile","+ Add a mobile phone","enter mobile number")}
                   
                    {this.display("Address","+ Add your address","Address,Town/City,Zip,Neighbourhood")}
                  
                    {this.display("Email","+ Add an Email address","enter email address")}
                
                    {this.display("Key","+ Add a public key","Enter a PGP public key")}
                   <br/>

                <div className = "heading" > Websites and social links </div>

                    {this.display("Websites","+ Add a website","enter a website")}

                    {this.display("Social","+ Add a social link","enter a social link")}

                    <br/>

                <div className = "heading" > Basic Information </div>

                    {this.display("Dob","+ Add a date of birth","enter a date of birth")}
              
                    {this.display("Year","+ Add a year of birth","enter a year of birth")}
                
                    {this.display("Gender","+ Add a gender","enter a gender")}
                
                    {this.display("Languages","+ Add a language","")}
                
                    {this.display("Interest","+ Add who you're interested in","")}
                    
                    {this.display("Religious","+ Add your religious view","")}
                
                    {this.display("Political","+ Add your political views","")}   
            </div>
        </div>
          );
         }
        }
        export default ContactInfo;