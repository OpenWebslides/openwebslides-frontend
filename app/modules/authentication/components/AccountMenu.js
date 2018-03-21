// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

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

const PureAccountMenu = (props: Props): React.node => {
  const { t, authenticated, account } = props;

  const displayName = authenticated ? (`${account.firstName} ${account.lastName}` || account.email) : null;

  if (!authenticated)
    return (
      <React.Fragment>
        <Menu.Item as={Link} to="/auth/signin">
          {t('auth:button.signin')}
        </Menu.Item>
        <Menu.Item as={Link} to="/auth/signup">
          {t('auth:button.signup')}
        </Menu.Item>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Menu.Item as={Link} to="/library">
        {t('navbar:library')}
      </Menu.Item>

      <Menu.Item as={Link} to="#">
        <Icon name="bell outline" />
      </Menu.Item>

      <Dropdown text={displayName} pointing={true} className="item">
        <Dropdown.Menu>
          <Dropdown.Header>{t('navbar:account')}</Dropdown.Header>
          <Dropdown.Item as={Link} to="/profile">{t('navbar:preferences')}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>{t('navbar:account')}</Dropdown.Header>
          <Dropdown.Item>{t('navbar:signout')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

const AccountMenu = connect(mapStateToProps)(translate()(PureAccountMenu));

export { PureAccountMenu };
export default AccountMenu;
