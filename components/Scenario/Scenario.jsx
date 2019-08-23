import React from 'react';
import ScenarioFeature from './ScenarioFeature.jsx';
import ProfileLink from '../ProfileLink.jsx';
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
                
                <p className="scenario_text">You are <strong><ProfileLink name= "Alex Doe"/></strong> from Fresno, California and regularly use FriendBook for professional and leisure activities. You are currently looking for a job and have been advised by your mentor that employers monitor and scrutinize applicants’ FriendBook profile before making decisions on whether to hire them or not. They have provided you with a <strong> list of items</strong> to consider about your profile as you go through the application process. </p>
                
                <p className="scenario_task">In a week, you have an upcoming interview, do what you want to your profile for representation that you are okay with recruiters seeing.</p>
                
                    <ol  id="list">
                      <li className="scenario-menu-item">
                          <label>1. Embarassing friend posts</label>
                          <span className="tooltiptext">Some of your friends may have posts with embarrassing content about you.</span>
                      </li> 
                      
                      <li className="scenario-menu-item">
                          <label>2. Annoying friends</label>
                          <span className="tooltiptext">Some of your friends might have constantly posted about things that you personally find to be annoying.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>3. Embarrassing personal posts</label>
                          <span className="tooltiptext">There are certain stories, photos or updates that you previously posted that might be embarrassing for others to see.</span>
                          
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>4. Endless app invites</label>
                          <span className="tooltiptext">Some of your friends have always endlessly invited you  to try out new apps.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>5. Endless event invites</label>
                          <span className="tooltiptext">Some of your friends have always endlessly invited you to events.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>6. Trolls</label>
                          <span className="tooltiptext">Some people bother or harass you.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>7. Undesirable personal posts </label>
                           <span className="tooltiptext">There are certain stories, photos or updates that you previously posted that might not be reflective of who you now are as a person.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>8. Who can post on  your timeline </label>
                           <span className="tooltiptext">Remember to control people posting on your timeline.
                           </span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>9. Review contact information</label>
                          <span className="tooltiptext">Review some of the contact information on your profile.
                          </span>
                      </li>
                      
                      <li className="scenario-menu-item">
                          <label>10. Review basic information</label>
                          <span className="tooltiptext"> Review some of the basic information on your profile.</span>
                      </li>
                      
                      <li className="scenario-menu-item">
                           <label>11. Verify post audience</label>
                           <span className="tooltiptext"> While posting, verify who can see what you share. </span>
                       </li>
                       
                      <li className="scenario-menu-item">
                          <label>12. Who can see that your online</label>
                          <span className="tooltiptext"> Examine chat to control who can see that your available online. </span>
                        </li>
                        
                      <li className="scenario-menu-item">
                          <label>13. Categorize friends</label>
                          <span className="tooltiptext"> Sort your friends according to who they are to you in order to control  what you want to share with them </span>
                       </li>
                    </ol>
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