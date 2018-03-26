// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Menu, Dropdown, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo.png';

type Props = TranslatorProps & { };

// TODO: pass t function to MenuRight
const MenuRight = (): React.Node => {
  return (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/Library">
        Library
      </Menu.Item>

      <Menu.Item as={Link} to="#">
        <Icon name="bell outline" />
      </Menu.Item>
      <Dropdown text="User" pointing={true} className="item">
        <Dropdown.Menu>
          <Dropdown.Header>Account</Dropdown.Header>
          <Dropdown.Item as={Link} to="/profile">Preferences</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Account</Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

const NavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu secondary={true} attached="top">
      <Menu.Item header={true} as={Link} to="/">
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Image src={logo} />
          </Grid.Column>
          <Grid.Column width={12} verticalAlign="middle">
            <strong>{t('app:title')}</strong>
          </Grid.Column>
        </Grid>
      </Menu.Item>

      <MenuRight />
    </Menu>
  );
};


export { NavigationBar as PureNavigationBar };
export default translate()(NavigationBar);
