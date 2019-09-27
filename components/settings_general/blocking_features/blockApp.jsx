import React from 'react'
import AutocompleteInput from '../../AutocompleteInput.jsx'
import Button from '../../Button.jsx';
import {friendsList,addToLocalStorageObject,getProfilePic,getParsed,saveVisitedAdaptation} from '../../../utilities.js';
import AutomationBoilerplate from '../../../adaptations/Automation/AutomationBoilerplate.jsx'
import SuggestionBoilerplate from '../../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import {HighlightBoilerplate} from '../../../adaptations/Highlight/HighlightBoilerplate.jsx'
import {createEvent} from '../../../adaptations/Event.jsx'


class BlockApp extends React.Component {
     constructor(props){
    super(props);
         
    let adaptation = getParsed('adaptations');
    let blockedApps = getParsed('blockedApps');     
    let adaptationVisited = getParsed("visited"); 
         
    this.state = {  
      appName: "",
      blockedAppsList:blockedApps,
        
       highlight: !adaptationVisited["Block_App"]["highlight"] && (adaptation["block_App"] == "high")?true:false,
        suggestion: !adaptationVisited ["Block_App"]["suggestion"]&& (adaptation["block_App"] === "sugst"),
        automation:!adaptationVisited ["Block_App"]["automation"]&& (adaptation["block_App"] === "auto"),
        displayAutomationPopup:true,
        displaySuggestionPopup:true,

        action:"Block_App ",    
        context:"Block_App",
        object:" blocking of Yahoo", 
        objectSugst: "block Yahoo",    
        label_Sugst:" I think you should block the \"Yahoo\" app", 
        label_Auto: "The grayed out and underlined apps were automatically blocked", 
    }
        
     this.handleChange = this.handleChange.bind(this);
     this.onEnter = this.onEnter.bind(this);
     this.showBlockedApps = this.showBlockedApps.bind(this);
     this.onClickUnBlock = this.onClickUnBlock.bind(this);
         
     /*Suggestion functions*/
    this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
    this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
         
    /*Automation functions*/
    this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
    this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
   
  }
    
  componentDidMount(){
      var blockedApps = JSON.parse(localStorage.getItem('blockedApps'))
      
      this.setState({
          blockedAppsList:blockedApps
      })
  }
    
  handleChange(value){
     this.setState({appName:value}) 
  }
    
  setLocalStorage(){
      
     localStorage.setItem('blockedApps',JSON.stringify(this.state.blockedAppsList))  
   }
    
        /*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        //this.changeAudience("future_requests","friends")
        this.state.blockedAppsList.push("Yahoo");
        
        this.setState({
             displaySuggestionPopup:false
        })  
    }
    
    onEnter(app){
      var event; 
      // this.state.blockedAppsList.push(app)
      this.setState({blockedAppsList: this.state.blockedAppsList.concat([app])})
      let used = JSON.parse(localStorage.featuresUsed);
      used.block.app = true;
      localStorage.setItem("featuresUsed", JSON.stringify(used));
      this.setLocalStorage(); 
      
         event = {
             action: `Block apps`,
             object: `Pressed the Enter key to the block app`,
             context: `Blocked ${app} app.Participant did this on their own`,
             
        };
        
        createEvent(event);
       
        //When adaptation is highligh and enter is pressed
        if(this.state.highlight){
            
            this.setState({highlight:false})
            
            HighlightBoilerplate ("Block_App");
           // saveVisitedAdaptation("Block_App","highlight");
      
        }
         
    }
    
    onClickUnBlock(app){
     //console.log('I am parent function is now:'+ this.state.blockedAppsList) 
     var Index = this.state.blockedAppsList.indexOf(app);
     this.state.blockedAppsList.splice(Index,1); 
     this.setState({ blockedAppsList: this.state.blockedAppsList})
     this. setLocalStorage();  
        
         var event = {
           action: `Unblock ${app} from App blockage`,
            object: `Pressed the UnBlock button to unblock app`,
            context: `Blocked ${app} App. Participant did this on their own`,
           
        };
        return event;
    }
    
      //Methods for the Automation Adaptation
   onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
   onClickUndo_Auto(){
        
       
       var list_Length = this.state.blockedAppsList.length;
       this.onClickUnBlock(this.state.blockedAppsList[list_Length - 1]);
       
       if(this.state.blockedAppsList.length === 0){
            this.setState({
                //blockedUserslist: unblockUsers,
                displayAutomationPopup:false
            })
       }
    }
    
    showBlockedApps(){
        //console.log('The length '+this.state.blockedAppsList.length)
        if(this.state.blockedAppsList.length > 0){
            return (
                <div>
                    <ul>
                        {this.state.blockedAppsList.map((app,index)=>{
                            
                            
                        if(this.state.displayAutomationPopup && this.state.automation) {
                            
                            return (<li key={index}><span className="righttop_text_onAutomation">{app}</span> <Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(app)}>Unblock</Button></li>)
                            
                        }else {
                            return (<li key={index}>{app}<Button href="javascript:void(0)" onClick={()=>this.onClickUnBlock(app)}>Unblock</Button></li>)}
                        })}
                    </ul>
                    
                     {/*The Automation Adaptation Popup*/ 
                        this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} object ={this.state.object} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
                      }
               
                </div>
            )
        }
    }
   render(){
       
       var autocomplete = <AutocompleteInput
       className = {this.state.highlight? "high1":null}
       commaSeperated
       onChange={(value) => this.handleChange(value)}
       defaultValue = {this.state.highlight? "Yahoo":""}
       placeholder='Type the name of an app...'
       list={["Skype", "Quora", "Lyft"]} //Will come from localStorage
       onEnter={this.onEnter}
       
       />
           
           
       return (
            <div id="right_bottom">
              <span className="rightbottom_label"> Block app  </span>
              <div className= "rightbottom_text">Once you've blocked an app,
                it can no longer contact you or get non-public information about you through Fakebook.
              <a href="#"> Learn more</a>  </div>
              
               <div id="right_bottom_form">
               
                  <label> Block apps </label>  
                      {/*<input id = "text" type="text" placeholder="Type the name of an app..."  onChange={this.handleChange} /> */}
                  {autocomplete}
                  {this.showBlockedApps()}
                  <br/>
              
              </div>
              
              {/*The Suggestion Adaptation*/
                 this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label_Sugst} object={this.state.objectSugst} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
                }
            </div>
       )
   } 
}

export default BlockApp;
