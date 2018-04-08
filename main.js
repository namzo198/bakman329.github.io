import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {BrowserRouter as Router,Route,Switch,browserHistory} from 'react-router-dom';

 
const app = document.getElementById('app');

//Method to hold react router Params & Queries
const UrlRouting = () =>(
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={App}/>
        </Switch>
    </Router>
);

ReactDOM.render( <UrlRouting/> , app);