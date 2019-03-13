// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { HOME_ROUTE } from 'config/routes';

import Logo from './Logo';
import AccountMenu from './AccountMenu';

type Props = {| |};

const PureNavigationBar = (props: Props): React.Node => {
  return (
    <Menu inverted={true} className="main-menu">
      <Menu.Item header={true} as={Link} to={HOME_ROUTE}>
        <Logo />
      </Menu.Item>
      <AccountMenu />
    </Menu>
  );
};

const NavigationBar = PureNavigationBar;

export { PureNavigationBar };
export default NavigationBar;
