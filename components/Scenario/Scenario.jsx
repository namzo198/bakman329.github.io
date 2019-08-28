import React from 'react';
import ScenarioFeature from './ScenarioFeature.jsx';
import ProfileLink from '../ProfileLink.jsx';
import ExitExperiment from './ExitExperiment.jsx';
import classNames from 'classnames'

class Scenario extends React.Component {
    constructor() {
        super();
        
        this.state = {
            toggled:false
        }
        
        this.toggleMenu = this.toggleMenu.bind(this);
       
    }
    
    toggleMenu(){
        
        this.setState((prevState) =>(
            {toggled: !prevState.toggled}
        ));
    }
    
    
    render() {
        
    var scenarioTextClass = classNames({
      'scenario_text': true,
      'floatbutton_pressed': this.state.toggled,
    });


        let buttons=[];
        let className = "scenario-menu";
        let icon = "add";
        
        if(this.state.toggled) {
            className += " open";
            icon = "close";
            
            buttons.push(<ScenarioFeature label="Categorize friends" icon="13" action={null} key="i13" id="feature13"/>);
            
             buttons.push(<ScenarioFeature label="Who can see that your online" icon="12" action={null} key="i12" id="feature12" />);
            
            buttons.push(<ScenarioFeature label="Verify post audience" icon="11" action={null} key="i11" id="feature11" />);
        
            buttons.push(<ScenarioFeature label="Review basic information" icon="10" action={null} key="i10" id="feature10" />);
            
            buttons.push(<ScenarioFeature label="Review contact information" icon="9" action={null} key="i9" id="feature9" />);
            
            buttons.push(<ScenarioFeature label="Who can post on  your timeline" icon="8" action={null} key="i8" id="feature8"/>);
            
            buttons.push(<ScenarioFeature label="Undesirable personal posts 
" icon="7" action={null} key="i7" id="feature7" />);
            
            buttons.push(<ScenarioFeature label="Trolls" icon="6" action={null} key="i6" id="feature6"/>);
            
            buttons.push(<ScenarioFeature label=" Endless event invites" icon="5" action={null} key="i5" id="feature5"/>);
            
            buttons.push(<ScenarioFeature label="Endless  app invites" icon="4" action={null} key="i4" id="feature4"/>);

            buttons.push(<ScenarioFeature label="Embarrassing personal posts." icon="3" action={null} key="i3" id="feature3"/>);
            
            buttons.push(<ScenarioFeature label="Annoying friends." icon="2" action={null} key="i2" id="feature2"/>);
            
             buttons.push(<ScenarioFeature label=" Embarassing friend posts." icon="1" action={null} key="i1" id="feature1"/>);
            }
            
         buttons.push(<ScenarioFeature label="" icon={icon} action ={this.toggleMenu} key="m" id="mainDescription" />);
            
        return(
                <div id="scenario-area">
                {/*<div className={className}>
                    {buttons}
                </div>*/}
                
                <h3 className="scenario_head">What is my Task ?</h3>
                
                <p className="scenario_text">You are <strong><ProfileLink name= "Alex Doe"/></strong> from Fresno. California and regularly use FriendBook for professional and leisure activities. You are looking for a job and have been advised by your mentor that employers monitor and scrutinize applicants’ FriendBook profile before making decisions on whether to hire them or not. They have provided you with the following <strong> list of items</strong> to consider about your profile as you go through the application process. </p>
                
                <p className="scenario_task">Given that you have an upcoming interview, go through your profile and see if you are okay with what's on it.</p>
                
                    <ol  id="list">
                      <li className="scenario-menu-item">
                          <label>Write a post stating that you are looking for a job</label>
                          <span className="tooltiptext"> It’s not uncommon for people to find a job via their social network. Write a post that states your looking for a job to notify your friends about your search. To avoid awkward situations, though, it is probably best not to tell anyone at your current employer about it</span>
                      </li> 
                      
                      <li className="scenario-menu-item">
                          <label>Review your contact information</label>
                          <span className="tooltiptext">Make sure you have a professional email address listed (alexdoe@gmail.com) where recruiters can contact you</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Review your profile page</label>
                          <span className="tooltiptext">Research shows that recruiters can be biased by things on candidates’ FreindBook profile pages. Think about removing or hiding parts of your profile that may bias a potential recruiter</span>
                          
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Remove undesirable personal posts</label>
                          <span className="tooltiptext">Revisit your previous posts. Are there any posts that are no longer reflective of who you are as a person?</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Get rid of embarraing posts about you by others</label>
                          <span className="tooltiptext">Some of your friends may have tagged you in posts or posted on your timeline embarrassing content about you that you may not want potential employers to see</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label> Limit what other people can post about you</label>
                          <span className="tooltiptext">In general, it may make sense to limit the extent to which other people post things about you on FriendBook</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Reduce distractions (chat, invites, etc.)</label>
                           <span className="tooltiptext">A job search can be stressful and it is a good idea to remove any distractions, e.g. by limiting invitations, chats, etc</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Get rid of annoying friends</label>
                           <span className="tooltiptext">It may also help to get rid of annoying distractions, such as FriendBook friends who post uninteresting or annoying content.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Categorize future job contacts</label>
                          <span className="tooltiptext">Make sure to keep track of whom among your Friendbook contacts is a recruiter or a potential future colleague
                          </span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>Block and/or report abusive friends</label>
                          <span className="tooltiptext">If you are being harassed online, is best not to engage. Instead, block and/or report the abusive friend</span>
                      </li>
                    </ol>
                    
                     <div id="experiment-done">
                       <ExitExperiment />
                     </div>
                </div> 
        )
        
    }
    
}

export default Scenario;

/*
  var btnClass = classNames({
      btn: true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });

*/