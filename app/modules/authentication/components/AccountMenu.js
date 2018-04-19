// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';

import type { State } from 'types/state';

import type { Account } from '../model';
import { isAuthenticated, getAccount } from '../selectors';
import { signout } from '../actions';

type StateProps = {
  authenticated: boolean,
  account: ?Account,
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
          {t('auth:button.signin')}
        </Menu.Item>
        <Menu.Item as={Link} to="/auth/signup">
          {t('auth:button.signup')}
        </Menu.Item>
      </React.Fragment>
    );
  }

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
          <Dropdown.Item>{t('navbar:preferences')}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignout}>
            {t('navbar:signout')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

const AccountMenu = connect(mapStateToProps, mapDispatchToProps)(translate()(PureAccountMenu));

export { PureAccountMenu };
export default AccountMenu;
