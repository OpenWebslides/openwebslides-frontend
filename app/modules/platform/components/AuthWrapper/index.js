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
  } = props;

  return (
    <ConditionalWrapper
      renderChildren={isAuthenticated}
      redirectIfNotChildren={AUTH_SIGNIN_ROUTE}
    >
      {children}
    </ConditionalWrapper>
  );
};

const AuthWrapper = connect(mapStateToProps)(PureAuthWrapper);

export { PureAuthWrapper };
export default AuthWrapper;
