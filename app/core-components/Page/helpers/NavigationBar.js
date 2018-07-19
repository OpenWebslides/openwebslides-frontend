// @flow

import * as React from 'react';
import { Menu } from 'semantic-ui-react';

import Logo from './helpers/Logo';
import AccountMenu from './helpers/AccountMenu';

const PureNavigationBar = (): React.Node => {
  return (
    <Menu secondary={true} attached="top">
      <Logo />
      <Menu.Menu position="right">
        <AccountMenu />
      </Menu.Menu>
    </Menu>
  );
};

const NavigationBar = PureNavigationBar;

export { PureNavigationBar };
export default NavigationBar;