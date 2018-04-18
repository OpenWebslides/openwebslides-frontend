// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link } from 'react-router-dom';
import { Image, Menu, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo_white.png';

import authentication from 'modules/authentication';

type Props = CustomTranslatorProps;

const { AccountMenu } = authentication.components;

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
