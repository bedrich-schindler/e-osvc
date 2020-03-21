import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import routes from './routes';

export default (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route
          component={DashboardPage}
          exact
          path={routes.dashboard}
        />
      </Switch>
    </Router>
  </Provider>
);
