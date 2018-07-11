// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

import type { State } from 'types/state';
import type { CustomTranslatorProps } from 'types/translator';
import type { User } from 'modules/users';

import { signout } from '../actions';
import { isAuthenticated, getAccount } from '../selectors';

type StateProps = {
  authenticated: boolean,
  account: ?User,
};

type DispatchProps = {
  handleSignout: () => void,
};

type Props = CustomTranslatorProps & StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    authenticated: isAuthenticated(state),
    account: getAccount(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleSignout: (): void => {
      dispatch(signout());
    },
  };
};

const PureAccountMenu = (props: Props): React.Node => {
  const { t, authenticated, account, handleSignout } = props;

  const displayName = authenticated && account ? (`${account.firstName} ${account.lastName ? account.lastName : ''}` || account.email) : null;

  if (!authenticated) {
    return (
      <React.Fragment>
        <Menu.Item as={Link} to="/auth/signin">
          {t('authentication:button.signin')}
        </Menu.Item>
        <Menu.Item as={Link} to="/auth/signup">
          {t('authentication:button.signup')}
        </Menu.Item>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Menu.Item as={Link} to="/library">
        {t('global:title.library')}
      </Menu.Item>

      <Menu.Item as={Link} to="#">
        <Icon name="bell outline" />
      </Menu.Item>

      <Dropdown text={displayName} pointing={true} className="item">
        <Dropdown.Menu>
          <Dropdown.Header>{t('global:navbar.account')}</Dropdown.Header>
          <Dropdown.Item as={Link} to="/profile">{t('global:navbar.preferences')}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>
            {t('authentication:button.signout')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

const AccountMenu = connect(mapStateToProps, mapDispatchToProps)(translate()(PureAccountMenu));

export { PureAccountMenu };
export default AccountMenu;
