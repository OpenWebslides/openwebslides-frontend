// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Logo from './Logo';
import AccountMenu from './AccountMenu';

type Props = {| ...TranslatorProps |};

const PureNavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu inverted={true} attached={true} className="main-menu">
      <Menu.Item header={true} as={Link} to="/">
        <Logo />
      </Menu.Item>
      <Menu.Item as={Link} to="/library">
        {t('global:title.library')}
      </Menu.Item>
      <Menu.Item as={Link} to="/editor">
        Editor (temp)
      </Menu.Item>
      <Menu.Menu position="right">
        <AccountMenu />
      </Menu.Menu>
    </Menu>
  );
};

const NavigationBar = translate()(PureNavigationBar);

export { PureNavigationBar };
export default NavigationBar;
