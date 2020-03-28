import React from 'react';
import {
  StylesProvider,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import {
  HashRouter,
  Router,
  Switch,
} from 'react-router-dom';
import teal from '@material-ui/core/colors/teal';
import {
  AuthorizedRoute,
  UnauthorizedRoute,
} from './resources/auth/components';
import routes from './routes';

// Main styles
import './styles/main.scss';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

export default (store, history, isWebVersion = true) => {
  let RouterComponent = Router;

  if (!isWebVersion) {
    RouterComponent = HashRouter;
  }

  return (
    <Provider store={store}>
      <RouterComponent history={history}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <Switch>
              {Object.values(routes).map((routeItem) => {
                if (routeItem.isAnonymous) {
                  return (
                    <UnauthorizedRoute
                      component={routeItem.component()}
                      exact
                      key={routeItem.path}
                      path={routeItem.path}
                    />
                  );
                }

                return (
                  <AuthorizedRoute
                    component={routeItem.component()}
                    exact
                    key={routeItem.path}
                    path={routeItem.path}
                  />
                );
              })}
            </Switch>
          </StylesProvider>
        </MuiThemeProvider>
      </RouterComponent>
    </Provider>
  );
};
