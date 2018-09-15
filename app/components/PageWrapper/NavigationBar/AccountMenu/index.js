// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { type AppState } from 'types/redux';
import platform from 'modules/platform';
import users from 'modules/users';

type StateProps = {|
  currentUserId: ?string,
|};

type Props = {| ...StateProps |};

const { AuthMenu } = platform.components;
const { UserAccountMenu } = users.components;

const mapStateToProps = (state: AppState): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);
  return {
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const PureAccountMenu = (props: Props): React.Node => {
  const { currentUserId } = props;

  return (currentUserId != null)
    ? <UserAccountMenu userId={currentUserId} />
    : <AuthMenu />;
};

const AccountMenu = connect(mapStateToProps)(PureAccountMenu);

export { PureAccountMenu };
export default AccountMenu;
