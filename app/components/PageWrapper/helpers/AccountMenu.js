// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate, type TranslatorProps } from 'react-i18next';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

import { AUTH_SIGNUP_ROUTE, AUTH_SIGNIN_ROUTE, USER_PROFILE_ROUTE } from 'config/routes';
import type { State } from 'types/state';
import platform from 'modules/platform';
import users from 'modules/users';

type StateProps = {|
  currentUser: ?users.model.User,
|};

type DispatchProps = {|
  onSignout: () => void,
|};

type Props = {|
  ...TranslatorProps,
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);
  const currentUser = (userAuth != null)
    ? users.selectors.getById(state, userAuth.userId)
    : null;

  return {
    currentUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onSignout: (): void => {
      dispatch(platform.actions.signout());
    },
  };
};

class PureAccountMenu extends React.Component<Props> {
  handleSignout = (): void => {
    const { onSignout } = this.props;
    onSignout();
  };

  render(): React.Node {
    const { t, currentUser } = this.props;

    const displayName = (currentUser) ? users.model.getName(currentUser) : null;

    // #TODO split this up and move components to modules/platform and modules/user, respectively
    if (!currentUser) {
      return (
        <React.Fragment>
          <Menu.Item as={Link} to={AUTH_SIGNUP_ROUTE}>
            <Icon name="user" />
            {t('global:navbar.signup')}
          </Menu.Item>
          <Menu.Item as={Link} to={AUTH_SIGNIN_ROUTE}>
            <Icon name="lock" />
            {t('global:navbar.signin')}
          </Menu.Item>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <Menu.Item as={Link} to="#">
            <Icon name="bell outline" />
          </Menu.Item>
          <Dropdown text={displayName} pointing={true} item={true}>
            <Dropdown.Menu>
              <Dropdown.Header>
                {t('global:navbar.account')}
              </Dropdown.Header>
              <Dropdown.Item as={Link} to={USER_PROFILE_ROUTE}>
                {t('global:navbar.preferences')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.handleSignout}>
                {t('global:navbar.signout')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      );
    }
  }
}

const AccountMenu = connect(mapStateToProps, mapDispatchToProps)(translate()(PureAccountMenu));

export { PureAccountMenu };
export default AccountMenu;
