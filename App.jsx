import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'

import NewsFeed from './components/NewsFeed.jsx'
import Header from './components/Header.jsx'
import BasicInfo from './components/settings/BasicInfo.jsx'

import {verifyLocalStorage} from './utilities.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    verifyLocalStorage();
  }

  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={NewsFeed} />
            <Route path='/settings/:section' component={BasicInfo} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;