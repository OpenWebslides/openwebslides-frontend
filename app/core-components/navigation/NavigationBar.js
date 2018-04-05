// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Menu, Dropdown, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo_white.png';

type Props = TranslatorProps;

const Logo = (props: Props): React.Node => {
  const { t } = props;
  return (
    <Menu.Item header={true} as={Link} to="/">
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={logo} />
          </Grid.Column>
          <Grid.Column width={12} verticalAlign="middle">
            <p>
              <strong>{t('app:title')}</strong>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu.Item>
  );
};

const MenuActions = (props: Props): React.Node => {
  const { t } = props;
  return (
    <Menu.Menu position="right">
      <Menu.Item as={Link} to="/library">
        {t('navbar:library')}
      </Menu.Item>

      <Menu.Item as={Link} to="#">
        <Icon name="bell outline" />
      </Menu.Item>
      <Dropdown text={t('navbar:user')} pointing={true} className="item">
        <Dropdown.Menu>
          <Dropdown.Header>{t('navbar:account')}</Dropdown.Header>
          <Dropdown.Item as={Link} to="/profile">{t('navbar:preferences')}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>{t('navbar:account')}</Dropdown.Header>
          <Dropdown.Item>{t('navbar:signout')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

const NavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu secondary={true} attached="top">
      <Logo t={t} />
      <MenuActions t={t} />
    </Menu>
  );
};


export { NavigationBar as PureNavigationBar };
export default translate()(NavigationBar);
