// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { type AppState } from 'types/redux';
import platform from 'modules/platform';
import users from 'modules/users';
import alerts from 'modules/alerts';

type StateProps = {|
  currentUserId: ?string,
|};

type Props = {| ...StateProps |};

const { Alerts } = alerts.components;
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

  return (
    <Menu.Menu position="right">
      {currentUserId != null ? (
        <>
          <Alerts />
          <UserAccountMenu userId={currentUserId} />
        </>
      ) : <AuthMenu />}
    </Menu.Menu>
  );
};

const AccountMenu = connect(mapStateToProps)(PureAccountMenu);

export { PureAccountMenu };
export default AccountMenu;
