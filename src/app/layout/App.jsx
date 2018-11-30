import React, { Component } from 'react'
import EventDashboard from '../../features/event/EventDashboard/EventDashboard'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar/NavBar'
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailledPage from '../../features/user/UserDetailed/UserDetailledPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Route path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/peoples" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailledPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createevent" component={EventForm} />
                </Switch>
              </Container>
            </div>
          )} />
      </div>
    );
  }
}

export default App;
