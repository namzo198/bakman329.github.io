import React,{Component} from 'react';
import Button from '../Button.jsx';
import Edit from './Functions/Edit.jsx'
import CheckBox from './Functions/CheckBox.jsx'
import AudienceMenu from '../AudienceMenu.jsx'
import SuggestionBoilerplate from '../../adaptations/Suggestion/SuggestionBoilerplate.jsx'
import AutomationBoilerplate from '../../adaptations/Automation/AutomationBoilerplate.jsx'
import {highLight,highLightExtended,No_highLight} from '../../adaptations/Highlight.js';

import {getParsed,addToLocalStorageObject} from '../../utilities.js'



class body extends Component {
    
    constructor(props){
        super(props)
        
        let adaptation = getParsed('adaptations');
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            adapt:adaptation['privacy_futureRequests'], //"high"/"sugst"/"automation"
            adaptationVisited:adaptationVisited,
            highlight:!adaptationVisited ["Privacy_futureRequests"]["highlight"]&& (adaptation["privacy_futureRequests"] === "high")?"high":null,
            suggestion: !adaptationVisited ["Privacy_futureRequests"]["suggestion"]&& (adaptation["privacy_futureRequests"] === "sugst"),
            automation:!adaptationVisited ["Privacy_futureRequests"]["automation"]&& (adaptation["privacy_futureRequests"] === "auto"),
            future_requests:!adaptationVisited ["Privacy_futureRequests"]["automation"]&& (adaptation["privacy_futureRequests"] === "auto")?"Friends":"Public",
            friend_request:"Friends",
            friend_list:"Everyone",
            email_lookup:"Friends",
            phone_lookup:"Everyone",
            search_index:"No",
            displaySuggestionPopup:true,
            displayAutomationPopup:true,
            
             //for the Suggestion Boilerplate code
             action: "Privacy_futureRequests, Check to see if the audience was changed/unchanged to the suggested audience i.e \"Friends\"",
              context:"Privacy_futureRequests",
              label:"I think you should change \"Who can see your future requests?\" to Friends",
              label_Auto:"The grayed out and underlined option's audience was automatically changed."
        }
        this.changeAudience = this.changeAudience.bind(this);
        this. changeStyle= this. changeStyle.bind(this);
        this.onClickDestroySuggestion = this.onClickDestroySuggestion.bind(this);
        this.onClickOK_Suggestion = this.onClickOK_Suggestion.bind(this);
        this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
        this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
    }
    
    /**componentDidMount(){
            //set all the variables to all that currently exist
        this.setState({
            future_posts:"Friends",
            friend_request:"Everyone",
            friend_list:"Friends",
            email_lookup:"Friends",
            phone_lookup:"Everyone",
            search_index:"No"
        })
        
        
    }*/
    
    
    changeAudience(the_audience,newAudience){
        
        var newAudience_Title_case = newAudience.charAt(0).toUpperCase() + newAudience.slice(1);
        
        this.setState({
            [the_audience]:newAudience_Title_case,
        })
        
  
    }
    /*Method for the Highlight Adaptation*/
    changeStyle(){
         if(!this.state.adaptationVisited["Privacy_futureRequests"]['highlight']){
            this.setState({
             highlight:null,
            })
          }
    }
    
    /*Methods for the Suggestion Adaptation*/
    onClickDestroySuggestion() {
        this.setState({
            displaySuggestionPopup:false
        })  
        
    }
    
    onClickOK_Suggestion(){
        this.changeAudience("future_requests","friends")
    }
    
    /*Methods for the Automation Adaptation */
     onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
    onClickUndo_Auto(){
     
        this.setState({
            future_requests:"Public",
            displayAutomationPopup:false
        })
    }
    
    displayEdit(section,description,edit_description,audienceSelectionMethod,closeEditDialog, adapt_Highlight,context){
        
        switch(section){
                
            case 'friend_posts':return (
               <div>
                   <div className="right_link">
                         <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close</Button>
                    </div>
                         
                    <div className="righttop_text">
                         <strong>{description}</strong>

                         <div>
                            {edit_description}
                         </div>
                        
                        <AudienceMenu onChange={audienceSelectionMethod}
                          className="audience_selection"
                          options={["public","friends","friends_except","more"]}
                          more={["specific_friends","only_me","see_all"]}
                          see_all={["custom"]}
                          title="Who should see this?"
                          //highlight={adapt_Highlight != null?highLight:null}
                          //removeHighlightOnClick={changeStyle}
                          adapt={adapt_Highlight}
                          context={context}
                          />
                           
                           
                        {/**<div className="audience_selection">
                           
                            <Button onClick={audienceSelectionMethod}>(TODO:Replace with the Audience Selector)</Button>
                        </div>*/}
                    </div>
                </div>)
            case 'phone_lookup':
            case 'email_lookup':    
            case 'friend_list' :return (
               <div>
                   <div className="right_link">
                         <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close</Button>
                    </div>
                         
                    <div className="righttop_text">
                         <strong>{description}</strong>

                         <div>
                            {edit_description}
                         </div>

                         <div className="audience_selection">
                          
                          <AudienceMenu onChange={audienceSelectionMethod}
                          className="new-post-menu"
                          options={["public","friends","friends_except","more"]}
                          more={["specific_friends","only_me","see_all"]}
                          see_all={["custom"]}
                          title="Who should see this?"
                          />
                           
                             {/*<Button onClick={audienceSelectionMethod}>(TODO:Replace with the Audience Selector)</Button>*/}
                        </div>
                    </div>
                </div>)
                
            case 'search_index':return (
               <div>
                   <div className="right_link">
                         <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close</Button>
                    </div>
                         
                    <div className="righttop_text">
                     <strong>{description}</strong>
                     
                        <div>When this setting is on, search engines may link to your Profile in their results.</div>
                        <br/>
                        
                        <div>
                            When this setting is off, search engines will stop linking to your Profile, but this may take some time. Your Profile can still be found on Fakebook if people search for your name.
                        </div>
                        <br/>
                        
                        <div>
                            <CheckBox label="Allow search engines outside of Fakebook to link your Profile" changeAudience={this.changeAudience} />
                             
                         </div>
                     
                    </div>
                </div>)
                       
            default: return(
                
                <div>
                    <div className="right_link">
                         <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close
                         </Button>
                     </div>

                    <div className="righttop_text">
                        <strong>{description}</strong>
                    </div>
                    <br/>
                    
                    <div className="audience_selection">
                    <AudienceMenu 
                        onChange={audienceSelectionMethod}
                        className="new-post-menu"
                        options={["everyone","friends_of_friends"]}
                    />
                    </div>
                                      
                    {/*<div className="audience_selection">
                        <Button onClick={audienceSelectionMethod}>(TODO:Replace with the Audience Selector)</Button>
                    </div>*/}
                    
                
                </div>
            )
        }
     }

   
    
    render() {
    
      return (

        <div id="wrapper_right">
          <div className = "right_content">
          <div>
          <h2 className = "right_header"> Privacy Settings and Tools </h2>
          </div>
        <hr/>
      <br/>
      
     
      {/*The Automation Adaptation*/ 
          this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
        }
      
       
       {/*The Suggestion Adaptation*/
          this.state.displaySuggestionPopup && this.state.suggestion && <SuggestionBoilerplate action={this.state.action}  context={this.state.context} label={this.state.label} agree={this.onClickOK_Suggestion} destroy = {this.onClickDestroySuggestion}/>
        }
       
        <div id="right_top">
          <span className="righttop_label">Your activity </span>
          
          <Edit description="Who can see your future requests?" edit_description="You decide who can see your posts each time you create a new post. Fakebook will use that audience for future posts unless you change it." audienceType="friend_posts" audience={this.state.future_requests} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} adapt = {this.state.highlight} automate={this.state.displayAutomationPopup && this.state.automation}/>
           <hb/>
           
            <div>
                <a className="right_link" href="#"> Use Activity Log</a>
                  <div className = "righttop_text">
                   Review all your posts and things you're tagged in
                   </div> <hb/>
            </div>
            
            <div>
                <a className="right_link" href="#"> Limit Past Posts</a>
                <div className = "righttop_text"> Limit the audience for posts you've shared with friends of friends or Public?
                 </div>
            </div>
    </div>
      <hr/>

        <div id="right_bottom">
          <span className="rightbottom_label"> How people can find and contact you </span>
          
           <Edit description="Who can send you friend requests?" audienceType="friend_request" audience={this.state.friend_request} changeAudience={this.changeAudience} renderEditForm={this.displayEdit}/>
           <hb/>
           
           <Edit description="Who can see your friend lists?" edit_description="Remember that your friends control who can see their friendships on their own timelines. If people can see your friendship on another timeline, they'll be able to see it in News Feed, search and other places on Fakebook. If you set this to Only me, only you will be able to see your full friends list on your timeline. Other people will only see mutual friends." audienceType="friend_list" audience={this.state.friend_list} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
           <hb/>
           
           <Edit description="Who can look you up using the email address you provided?" edit_description="This applies to people who can't see your email address on your profile." audienceType="email_lookup" audience={this.state.email_lookup} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
           <hb/>
             
            <Edit description="Who can look you up using the phone number you provided?" edit_description="This applies to people who can't see your phone number on your profile." audienceType="phone_lookup" audience={this.state.phone_lookup} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
            <hb/>
              
              <Edit description="Do you want search engines outside of Fakebook to link to your Profile?" audienceType="search_index" audience={this.state.search_index} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
            <hr/>
        </div> 
     </div> 
    </div>
      );
     }
}
export default body;