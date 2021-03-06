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
  Route,
  Switch,
} from 'react-router-dom';
import teal from '@material-ui/core/colors/teal';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { NotFoundPage } from './pages/notFound';
import {
  AuthorizedRoute,
  UnauthorizedRoute,
} from './resources/auth/components';
import { setIsOnline } from './resources/settings';
import { registerNotificationService } from './services/notificationService';
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

export default (store, history) => {
  let RouterComponent = Router;

  if (IS_ELECTRON) {
    RouterComponent = HashRouter;
  }

  // Detect if browser is online or not
  const isOnlineChangedHandler = () => {
    store.dispatch(setIsOnline(window.navigator.onLine));
  };

  window.addEventListener('online', isOnlineChangedHandler);
  window.addEventListener('offline', isOnlineChangedHandler);

  // Notification service registration
  registerNotificationService(store);

  // Timer service registration
  if (IS_ELECTRON) {
    import('./services/timerService').then((timerService) => {
      timerService.registerTimerService(store);

      return timerService;
    });
  }

  return (
    <Provider store={store}>
      <RouterComponent history={history}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                <Route component={NotFoundPage} />
              </Switch>
            </StylesProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </RouterComponent>
    </Provider>
  );
};
