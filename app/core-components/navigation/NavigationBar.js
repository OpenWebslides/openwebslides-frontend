// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Menu, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo_white.png';

import authentication from 'modules/authentication';

const { AccountDropdown } = authentication.components;

type Props = TranslatorProps;

const PureLogo = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu.Item header={true} as={Link} to="/">
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={logo} />
          </Grid.Column>
          <Grid.Column width={12} verticalAlign="middle">
            <Menu.Item>
              <strong>{t('app:title')}</strong>
            </Menu.Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu.Item>
  );
};

const Logo = translate()(PureLogo);

const PureMenuActions = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/library">
        {t('navbar:library')}
      </Menu.Item>

      <Menu.Item as={Link} to="#">
        <Icon name="bell outline" />
      </Menu.Item>

      <AccountDropdown />
    </Menu.Menu>
  );
};

const MenuActions = translate()(PureMenuActions);

const PureNavigationBar = (): React.Node => {
  return (
    <Menu secondary={true} attached="top">
      <Logo />
      <MenuActions />
    </Menu>
  );
};

const NavigationBar = PureNavigationBar;

export { PureNavigationBar };
export default NavigationBar;
