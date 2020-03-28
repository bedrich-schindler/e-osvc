import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import routes from '../../../../routes';

const UnauthorizedRouteComponent = ({
  token,
  component,
  exact,
  path,
}) => {
  if (!token) {
    return (
      <Route
        component={component}
        exact={exact}
        path={path}
      />
    );
  }

  return <Redirect to={routes.dashboard.path} />;
};

UnauthorizedRouteComponent.defaultProps = {
  exact: false,
  token: null,
};

UnauthorizedRouteComponent.propTypes = {
  component: PropTypes.any.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  token: PropTypes.string,
};

export default UnauthorizedRouteComponent;
