// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { HOME_ROUTE, USER_LIBRARY_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';

import Logo from './Logo';
import AccountMenu from './AccountMenu';

type Props = {| ...TranslatorProps |};

const PureNavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu inverted={true} attached={true} className="main-menu">
      <Menu.Item header={true} as={Link} to={HOME_ROUTE}>
        <Logo />
      </Menu.Item>
      <Menu.Item as={Link} to={USER_LIBRARY_ROUTE}>
        {t('global:title.library')}
      </Menu.Item>
      <Menu.Item as={Link} to={TOPIC_EDITOR_ROUTE}>
        Editor (temp)
      </Menu.Item>
      <AccountMenu />
    </Menu>
  );
};

const NavigationBar = translate()(PureNavigationBar);

export { PureNavigationBar };
export default NavigationBar;
