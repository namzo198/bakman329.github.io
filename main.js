import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import BasicInfo from './components/settings/BasicInfo.jsx'
import Block from './components/settings/blockInvite.jsx'
import {BrowserRouter as Router,Link,Route,Switch,browserHistory} from 'react-router-dom';

 
const app = document.getElementById('app');

//Method to hold react router Params & Queries
const UrlRouting = () =>(
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/settings/BasicInfo*" component={BasicInfo}/>
            <Route path="/settings/BlockInvite*" component={Block} /> 
                                                         
        </Switch>
    </Router>
);

ReactDOM.render( <UrlRouting/> , app);