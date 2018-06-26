// @flow

import * as React from 'react';
import { Menu } from 'semantic-ui-react';

import Logo from 'core-components/logo';

import authentication from 'modules/authentication';

const { AccountMenu } = authentication.components;

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
