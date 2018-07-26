// @flow
/**
 * Renders its children only if the user is not authenticated.
 */

import * as React from 'react';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import ConditionalWrapper from 'components/ConditionalWrapper';

import selectors from '../../selectors';

type PassedProps = {|
  children: React.Node,
  // Optional route to which the user will be redirected, if the user is authenticated.
  // Defaults to NULL.
  redirectIfAuthenticated: ?string,
  // Optional component that will be rendered instead of the children,
  // if the user is authenticated.
  componentIfAuthenticated: ?React.ComponentType<{}>,
|};

type StateProps = {|
  isAuthenticated: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State): StateProps => {
  return {
    isAuthenticated: selectors.isAuthenticated(state),
  };
};

const PureUnauthWrapper = (props: Props): React.Node => {
  const {
    children,
    isAuthenticated,
    componentIfAuthenticated,
    redirectIfAuthenticated,
  } = props;

  return (
    <ConditionalWrapper
      renderChildren={!isAuthenticated}
      componentIfNotChildren={componentIfAuthenticated}
      redirectIfNotChildren={redirectIfAuthenticated}
    >
      {children}
    </ConditionalWrapper>
  );
};

PureUnauthWrapper.defaultProps = {
  redirectIfAuthenticated: null,
  componentIfAuthenticated: null,
};

const UnauthWrapper = connect(mapStateToProps)(PureUnauthWrapper);

export { PureUnauthWrapper };
export default UnauthWrapper;
