import React from 'react';
import { Provider } from 'react-redux';
import {
  HashRouter,
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import routes from './routes';

export default (store, history, isWebVersion = true) => {
  let RouterComponent = Router;

  if (!isWebVersion) {
    RouterComponent = HashRouter;
  }

  return (
    <Provider store={store}>
      <RouterComponent history={history}>
        <Switch>
          <Route
            component={DashboardPage}
            exact
            path={routes.dashboard}
          />
        </Switch>
      </RouterComponent>
    </Provider>
  )
};
