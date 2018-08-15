// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { HOME_ROUTE } from 'config/routes';

import Logo from './Logo';
import AccountMenu from './AccountMenu';

type Props = {| ...TranslatorProps |};

const PureNavigationBar = (props: Props): React.Node => {
  return (
    <Menu inverted={true} attached={true} className="main-menu">
      <Menu.Item header={true} as={Link} to={HOME_ROUTE}>
        <Logo />
      </Menu.Item>
      <AccountMenu />
    </Menu>
  );
};

const NavigationBar = translate()(PureNavigationBar);

export { PureNavigationBar };
export default NavigationBar;
