// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';

type Props = TranslatorProps & { };

// TODO: pass t function to MenuRight
const MenuRight = (): React.Node => {
  return (
    <Menu.Menu position="right">
      <Menu.Item>
        <Link to="/Library">
          <Icon size="large" name="book" />
          Library
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Icon size="large" name="bell outline" />
      </Menu.Item>
      <Menu.Item>
        <strong>Professor X</strong>
      </Menu.Item>
      <Menu.Item>
        <Icon size="large" name="user" />
      </Menu.Item>
    </Menu.Menu>
  );
};

const NavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu secondary={true} attached="top">
      <Menu.Item icon={true}>
        <Link to="/">
          <Image size="tiny" src="/assets/images/logo.png" />
          {t('app:title')}
        </Link>
      </Menu.Item>
      <MenuRight />
    </Menu>
  );
};


export { NavigationBar as PureNavigationBar };
export default translate()(NavigationBar);
