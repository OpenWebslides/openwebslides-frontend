// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import FetchWrapper from 'components/FetchWrapper';
import { type AppState } from 'types/redux';
import platform from 'modules/platform';
import users from 'modules/users';

import policies from '../../policies';

type PassedProps<T> = {|
  record: T,
  policy: policies.Policy<T>,
  action: string,
  children: React.Node,
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
    const { record, policy: PolicyClass, action, children } = this.props;

    // $FlowFixMe I have no idea how to FlowFix this
    const policy = new PolicyClass(currentUser, record);

    return policy[action]() ? children : null;
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
