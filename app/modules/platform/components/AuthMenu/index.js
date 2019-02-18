// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

import { AUTH_SIGNUP_ROUTE, AUTH_SIGNIN_ROUTE } from 'config/routes';

type Props = {| |};

const PureAuthMenu = (props: Props): React.Node => {
  const [t] = useTranslation();

  return (
    <Menu.Menu position="right" data-test-id="auth-menu">
      <Menu.Item as={Link} to={AUTH_SIGNUP_ROUTE}>
        <Icon name="user" />
        {t('global:navbar.signup')}
      </Menu.Item>
      <Menu.Item as={Link} to={AUTH_SIGNIN_ROUTE}>
        <Icon name="lock" />
        {t('global:navbar.signin')}
      </Menu.Item>
    </Menu.Menu>
  );
};

const AuthMenu = PureAuthMenu;

export { PureAuthMenu };
export default AuthMenu;
