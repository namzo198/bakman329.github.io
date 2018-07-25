    import React from 'react'
    import Header from './header.jsx'
    import Body from './body.jsx'
    
   

    class BasicInfo extends React.Component {
        constructor(props) {
            super(props)
            
            this.state= {
                adaptationMethod: '',
                userSessionId: ''
            }
        }
        
        componentWillMount(){
            this.setState({
                adaptationMethod: this.props.location.state.witholdbasicInfo,
                userSessionId: this.props.location.state.session
            })
        }
        
        render(){
           
            return(

                <div >
                    <Header />
                   <Body adapt={this.state.adaptationMethod} userSession={this.state.userSessionId}/>
                    
                    
                    
                </div>
            );
        }
    }

export default BasicInfo;