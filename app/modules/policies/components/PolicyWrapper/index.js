// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import FetchWrapper from 'components/FetchWrapper';
import ConditionalWrapper from 'components/ConditionalWrapper';
import { type AppState } from 'types/redux';
import platform from 'modules/platform';
import users from 'modules/users';

import policies from '../../policies';

type PassedProps<T> = {|
  record: T,
  policy: policies.Policy<T>,
  action: string,
  children: React.Node,
  // Optional route to which the user will be redirected, if the user is not authenticated.
  // Defaults to SIGNIN_ROUTE. Redirecting can be disabled by setting this to NULL.
  redirectIfNotAuthenticated: ?string,
  // Optional component that will be rendered instead of the children,
  // if the user is not authenticated.
  componentIfNotAuthenticated: ?React.ComponentType<{}>,
|};

type StateProps = {|
  currentUserId: ?string,
|};

type Props<T> = {| ...PassedProps<T>, ...StateProps |};

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

class PurePolicyWrapper<T> extends React.Component<Props<T>> {
  renderPolicyWrapper = (currentUser: users.model.User): React.Node => {
    const {
      record,
      policy: PolicyClass,
      action,
      children,
      redirectIfNotAuthenticated,
      componentIfNotAuthenticated,
    } = this.props;

    // $FlowFixMe I have no idea how to FlowFix this
    const policy = new PolicyClass(currentUser, record);

    return (
      <ConditionalWrapper
        renderChildren={policy[action]()}
        componentIfNotChildren={componentIfNotAuthenticated}
        redirectIfNotChildren={redirectIfNotAuthenticated}
      >
        {children}
      </ConditionalWrapper>
    );
  };

  render(): React.Node {
    const { currentUserId } = this.props;

    return currentUserId == null ? null : (
      <FetchWrapper
        render={this.renderPolicyWrapper}
        renderPropsAndState={this.props}
        fetchId={currentUserId}
        fetchAction={users.actions.fetch}
        fetchedPropSelector={users.selectors.getById}
      />
    );
  }
}

const PolicyWrapper = connect(mapStateToProps)(PurePolicyWrapper);

export { PurePolicyWrapper };
export default PolicyWrapper;
