// @flow

/**
 * Renders its children only if the user is authenticated.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import { AUTH_SIGNIN_ROUTE } from 'config/routes';
import ConditionalWrapper from 'components/ConditionalWrapper';

import selectors from '../../selectors';

type PassedProps = {|
  children: React.Node,
  // Optional route to which the user will be redirected, if the user is not authenticated.
  // Defaults to SIGNIN_ROUTE. Redirecting can be disabled by setting this to NULL.
  redirectIfNotAuthenticated: ?string,
  // Optional component that will be rendered instead of the children,
  // if the user is not authenticated.
  componentIfNotAuthenticated: ?React.ComponentType<{}>,
|};

type StateProps = {|
  isAuthenticated: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    isAuthenticated: selectors.isAuthenticated(state),
  };
};

const PureAuthWrapper = (props: Props): React.Node => {
  const {
    children,
    isAuthenticated,
    componentIfNotAuthenticated,
    redirectIfNotAuthenticated,
  } = props;

  return (
    <ConditionalWrapper
      renderChildren={isAuthenticated}
      componentIfNotChildren={componentIfNotAuthenticated}
      redirectIfNotChildren={redirectIfNotAuthenticated}
    >
      {children}
    </ConditionalWrapper>
  );
};

PureAuthWrapper.defaultProps = {
  redirectIfNotAuthenticated: AUTH_SIGNIN_ROUTE,
  componentIfNotAuthenticated: null,
};

const AuthWrapper = connect(mapStateToProps)(PureAuthWrapper);

export { PureAuthWrapper };
export default AuthWrapper;
