// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid, Icon, Image, Menu } from 'semantic-ui-react';

import home from 'modules/home';

type Props = TranslatorProps & { /* new props go here */ };

const HomeContainer = home.components.components.homecontainer;

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

/* TODO passing t prop not possible yet
const MenuLeft = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <Menu.Item icon="true">
        <Image size="tiny" src="/assets/images/logo.png" />
        {t('app:title')}
      </Menu.Item>
      <Menu.Item>
        <Link to="/topics">Topics page</Link>
      </Menu.Item>
    </div>
  );
};
*/

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <Menu secondary={true} attached="top">
        <Menu.Item icon={true}>
          <Image size="tiny" src="/assets/images/logo.png" href="/" />
          {t('app:title')}
        </Menu.Item>
        <MenuRight />
      </Menu>
      <Grid stretched={true}>
        <Grid.Column stretched={true} width={2}>
          <Menu vertical={true} fluid={true}>
            <Menu.Header>
              <Link to="/topics">Library</Link>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={14}>
          <HomeContainer />
        </Grid.Column>
      </Grid>
    </div>
  );
};


const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
