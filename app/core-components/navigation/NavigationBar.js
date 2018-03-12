// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';

type Props = TranslatorProps & { /* new props go here */ };

const MenuRight = (): React.Node => {
  return (
    <Menu.Menu position="right">
      <Menu.Item>
        <Icon name="bell outline" size="large" />
      </Menu.Item>
      <Menu.Item>
        <strong>Professor X</strong>
      </Menu.Item>
      <Menu.Item>
        <Icon name="user" size="large" circular={true} inverted={true} />
      </Menu.Item>
    </Menu.Menu>
  );
};

const NavigationBar = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <Menu secondary={true} attached="top">
        <Menu.Item icon={true}>
          <Link to="/">
            <Image size="tiny" src="/assets/images/logo.png" />
            {t('app:title')}
          </Link>
        </Menu.Item>
        <MenuRight />
      </Menu>
    </div>
  );
};


export { NavigationBar as PureNavigationBar };
export default translate()(NavigationBar);
