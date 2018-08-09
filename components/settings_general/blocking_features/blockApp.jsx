import React from 'react'
import AutocompleteInput from '../../AutocompleteInput.jsx'
import Button from '../../Button.jsx';

class BlockApp extends React.Component {
     constructor(props){
    super(props);
    this.state = {  
      appName: "",
      blockedAppsList:[]
    }
        
     this.handleChange = this.handleChange.bind(this);
     this.onEnter = this.onEnter.bind(this);
     this.showBlockedApps = this.showBlockedApps.bind(this);
     this.onClickUnblock = this.onClickUnblock.bind(this);
   
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
    
    onEnter(app){
      this.state.blockedAppsList.push(app)
      this.setLocalStorage(); 
    }
    
    onClickUnblock(app){
     //console.log('I am parent function is now:'+ this.state.blockedAppsList) 
     var Index = this.state.blockedAppsList.indexOf(app);
     this.state.blockedAppsList.splice(Index,1); 
     this.setState({ blockedAppsList: this.state.blockedAppsList})
     this. setLocalStorage();  
        
         var event = {
           action: `Unblock ${app} from App blockage`,
           context: 'Block App',
           name:'John Doe'
        };
        return event;
    }
    
    showBlockedApps(){
        console.log('The length '+this.state.blockedAppsList.length)
        if(this.state.blockedAppsList.length > 0){
            return (
                <div>
                    <ul>
                        {this.state.blockedAppsList.map((app,index)=>{
                            return <li key={index}>{app}<Button href="javascript:void(0)" onClick={()=>this.onClickUnblock(app)}>Unblock</Button></li>
                        })}
                    </ul>
                </div>
            )
        }
    }
   render(){
       
       var autocomplete = <AutocompleteInput
       commaSeperated
       onChange={(value) => this.handleChange(value)}
       defaultValue = ""
       placeholder='Type the name of an app...'
       list={["Yahoo", "Skype", "Quora"]} //Will come from localStorage
       onEnter={this.onEnter}
       
       />
           
       return (
            <div id="right_bottom">
              <span className="rightbottom_label"> Block app  </span>
              <div className= "rightbottom_text">Once you've blocked an app,
                it can no longer contact you or get non-public information about you through Facebook.
              <a href="#"> Learn more</a>  </div>
              
               <div id="right_bottom_form">
               
                  <label> Block apps </label>  
                      {/*<input id = "text" type="text" placeholder="Type the name of an app..."  onChange={this.handleChange} /> */}
                  {autocomplete}
                  {this.showBlockedApps()}
                  <br/>
              
              </div>
            </div>
       )
   } 
}

export default BlockApp;