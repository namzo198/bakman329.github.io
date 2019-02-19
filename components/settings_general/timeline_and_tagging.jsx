
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Button from '../Button.jsx';
import Edit from './Functions/Edit.jsx';
import ProfileLink from '../ProfileLink.jsx';
import {nameToLink,getParsed,addToLocalStorageObject,saveVisitedAdapatation} from '../../utilities.js';
import AutomationBoilerplate from '../../adaptations/Automation/AutomationBoilerplate.jsx'







class TimelineandTagging extends Component {
    constructor(props){
        super(props)
       
         let adaptation = getParsed('adaptations');
        let adaptationVisited = getParsed("visited");
        
        this.state = {
            timeline_post:'',
            timeline_see:'',
            tag_post:'',
            tag_audience:'', 
            review_posts:'',
            review_tags:'',
            automation: !adaptationVisited ["Timeline_seePost"]["automation"]&& (adaptation["timeline_seePost"] === "auto"),
            displayAutomationPopup:true,
            
            action: "Timeline_seePost, Check to see if the audience was changed/unchanged to the suggested audience i.e \"Friends\"",
            context:"Timeline_seePost",
            label_Auto:"The grayed out and underlined option's audience was automatically changed",
        }
        
        
        this.changeAudience = this.changeAudience.bind(this);
        this.onClickOk_Auto = this.onClickOk_Auto.bind(this);
        this.onClickUndo_Auto = this.onClickUndo_Auto.bind(this);
        //this.editDialog= this.editDialog.bind(this)
        
        
    }
    
    componentDidMount(){
        //set all the variables that exist
        this.setState({
            timeline_post:"Friends",
            timeline_see:"Everyone",
            tag_post: "Everyone",
            tag_audience:"Friends",
            review_posts:"On",
            review_tags:"On"
        })
    }

    
   changeAudience(the_audience, newAudience){
       this.setState({
           [the_audience]:newAudience,
       })
   }
    
    /*Methods for the Automation Adaptation */
    onClickOk_Auto(){
        this.setState({
            displayAutomationPopup:false
        })
    }
    
    onClickUndo_Auto(){
        this.setState({
            displayAutomationPopup:false,
            timeline_see:"Friends"
        })
    }
    
   displayEdit(section,description,edit_description,audienceSelectionMethod,closeEditDialog){
       
           switch(section){
                   
            case'review_posts': return (
               <div>
                   <div className="right_link">
                         <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close</Button>
                    </div>
                         
                    <div className="righttop_text">
                     <strong>{description}</strong>
                     
                     <div>
                        Timeline review controls whether you have to manually approve posts you're tagged in before they go on your timeline. When you have a post to review, just click <a href="#"> Timeline review</a> on the left-hand side of your activity log.
                     </div>
                     
                     <div>
                         Note: This only controls what's allowed on your timeline. Posts you're tagged in still appear in search, News Feed and other places on Fakebook
                     </div>
                     
                     <div className="audience_selection">(TODO:Replace with Enable/Disable)</div>
                     <div><img className="review_image" src="/assets/timeline_review.png"/></div>
                     
                      </div>
                </div>)
                   
              case 'review_tags': return(
               <div>
                   <div className="right_link">
                             <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close
                             </Button>
                    </div>
                         
                    <div className="righttop_text">
                     <strong>{description}</strong>
                     
                     <div>If someone who you aren't friends with adds a tag to your post, you'll still be asked to review it.</div>
                     
                     <div>
                         Remember: When you approve a tag, the person tagged and their friends may be able to see your post.
                     </div>
                     <div className="audience_selection">(TODO:Replace with Enable/Disable)</div>
                     <div><img className="review_image" src="/assets/timeline_tag.png"/></div>
                     
                      </div>
                </div>
               )
                   
         default : return(<div>
                <div className="right_link">
                     <Button  href ="javascript:void(0)" onClick={closeEditDialog}> Close
                     </Button>
                 </div>
                 
                <div className="righttop_text">
                    <strong>{description}</strong>
                </div>
                <br/>
                
                <div className="audience_selection">
                    <Button onClick={audienceSelectionMethod}>(TODO:Replace with the Audience Selector)</Button>
                </div>
            </div>)
           }
    }
    
    /*displayNormal(description,audience,openEdit){
    
       return( 
           
           <div> 
                    <div className="right_link">
                    <Button href="javascript:void(0)" onClick={openEdit}>Edit</Button>
                    
                    </div>
                    <div className="audience_selected">{audience}</div>
                    <div className = "righttop_text">{description}</div>
                   
                </div>
           )
    }*/
      
render(){
    
  return (
      <div id="wrapper_right">
          <div className = "right_content">
          <div>
              <h2 className = "right_header"> Timeline and Tagging Settings </h2>
          </div>
            <hr/>
          <br/>
          
        {/*The Automation Adaptation*/ 
          this.state.displayAutomationPopup && this.state.automation && <AutomationBoilerplate action = {this.state.action} context = {this.state.context} label={this.state.label_Auto} onClickOK_Auto={this.onClickOk_Auto} onClickUnDo_Auto = {this.onClickUndo_Auto}/>
        }
          
        <div id="right_top">
            <span className="righttop_label">Timeline </span>   
            {/*this.displayNormal("Who can post on your timeline?","timeline_post")*/}
            <Edit description="Who can post on your timeline?" audienceType="timeline_post" audience={this.state.timeline_post} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} renderNormal={this.displayNormal} />
            <hb/>

            <Edit description="Who can see what others post on your timeline?" audienceType="timeline_see" audience={this.state.timeline_see} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} renderNormal={this.displayNormal} automate={this.state.displayAutomationPopup && this.state.automation}/>

        </div>
         <hr/>

        <div id="right_bottom">
        
          <span className="rightbottom_label"> Tagging </span>

           <Edit description="Who can see posts that you're tagged in on your timeline?" audienceType="tag_post" audience={this.state.tag_post} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
           <hb/>

          <Edit description="When you're tagged in a post, who do you want to add to the audience of the post if they can't already see it?" audienceType="tag_audience" audience={this.state.tag_audience} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
        </div>
        <hr/>

        <div id="right_bottom">
            <span className="rightbottom_label"> Review </span>

            <Edit description="Review posts that you're tagged in before the posts appear on your timeline?" audienceType="review_posts" audience={this.state.review_posts} changeAudience={this.changeAudience} renderEditForm={this.displayEdit} />
            <hb/>

             <div>
                <span className="right_link">
                    {/*<Link to={{pathname: '/profile/' + nameToLink("John Doe"),state: {fromTimelineandTagging: true}}}>View as
                   </Link>*/}
                   <a href="javascript:void(0)">View as</a>
                </span>

                <div className = "righttop_text">
                    Review what other people see on your timeline
                </div> 
                <hb/>
            </div>


            <Edit description="Review tags that people add to your posts before the tags appear on Fakebook?" audienceType="review_tags" audience={this.state.review_tags} changeAudience={this.changeAudience} renderEditForm={this.displayEdit}  />  
                  {/*this.display("Review tags that people add to your posts before the tags appear on Facebook?","rtag",false,true)*/}   
        </div>
         <hr/>

          </div>
    </div>


  );
 }
}

export default TimelineandTagging;