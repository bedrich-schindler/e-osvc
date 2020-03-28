import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import routes from '../../../../routes';

const AuthorizedRouteComponent = (props) => {
  const {
    component,
    exact,
    path,
    token,
  } = props;

  if (token) {
    return (
      <Route
        component={component}
        exact={exact}
        path={path}
      />
    );
  }

  return <Redirect to={routes.login.path} />;
};

AuthorizedRouteComponent.defaultProps = {
  exact: false,
  token: null,
};

AuthorizedRouteComponent.propTypes = {
  component: PropTypes.any.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  token: PropTypes.string,
};

export default withRouter(AuthorizedRouteComponent);
