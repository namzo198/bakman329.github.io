
import React from 'react';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'

import NewsFeed from './components/NewsFeed.jsx'
import Header from './components/Header.jsx'
import BasicInfo from './components/settings_profile/BasicInfo.jsx'
import GeneralSettings from './components/settings_general/GeneralSettings.jsx'

import {verifyLocalStorage} from './utilities.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    verifyLocalStorage();
  }

  render() {
    return (
     
    <div>
        <BrowserRouter>
         <main>
            <Header />
              <Switch>
                <Route exact path='/' component={NewsFeed} />
                <Route path='/settings_profile/:section' component={BasicInfo} />
                <Route path='/settings_general/:section' component={GeneralSettings}/>
              </Switch>
        </main>
        </BrowserRouter>
     </div>
    );
  }
}

export default App;

