// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

import { Account } from '../model';
import { isAuthenticated, getAccount } from '../selectors';

type StateProps = {
  authenticated: boolean,
  account: ?Account,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    authenticated: isAuthenticated(state),
    account: getAccount(state),
  };
};

const PureAccountDropdown = (props: Props): React.node => {
  const { t, authenticated, account } = props;

  const displayName = authenticated ? (`${account.firstName} ${account.lastName}` || account.email) : null;

  if (authenticated) {
    return (
      <Dropdown text={displayName} pointing={true} className="item">
        <Dropdown.Menu>
          <Dropdown.Header>Account</Dropdown.Header>
          <Dropdown.Item>Preferences</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Account</Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <React.Fragment>
        <Menu.Item as={Link} primary={true} to="/auth/signin">
          {t('auth:button.signin')}
        </Menu.Item>
        <Menu.Item as={Link} to="/auth/signup">
          {t('auth:button.signup')}
        </Menu.Item>
      </React.Fragment>
    );
  }
};

const AccountDropdown = connect(mapStateToProps)(translate()(PureAccountDropdown));

export { PureAccountDropdown };
export default AccountDropdown;
