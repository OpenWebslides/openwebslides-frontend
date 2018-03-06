// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
// import { Link } from 'react-router-dom';
import { Grid, Divider, Icon, Container, Image, Menu } from 'semantic-ui-react';

type Props = TranslatorProps & { /* new props go here */ };

const HomeSocialFeed = (): React.Node => {
  return (
    <Container>
      <h1>Social feed</h1>
      <p>
        <strong>Student U</strong> commented on topic
        <strong>
          {`
            "Analysis of UV light"
          `}
        </strong>
      </p>

      <p>
        <strong>Professor W</strong> deleted topic
        <strong>
          {`
            "The genesis of the WWW"
          `}
        </strong>
      </p>

      <p>
        <strong>Professor X</strong> created topic
        <strong>
          {`
            "Mutations: How do they affect our world today"
          `}
        </strong>
      </p>

      <p>
        <strong>Student Y</strong> created a pull request for topic
        <strong>
          {`
            "Why 'The Walking Dead' avoids the Z word"
          `}
        </strong>
      </p>
    </Container>
  );
};

const HomeSearchSection = (): React.Node => {
  return (
    <Container>
      Search for topics here!
    </Container>
  );
};

const HomeContainer = (): React.Node => {
  return (
    <Container>
      <HomeSocialFeed />
      <Divider section="true" />
      <HomeSearchSection />
    </Container>
  );
};

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
        <Icon name="user" size="large" circular="true" inverted="true" />
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

const HomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <Menu secondary="true" attached="top">
        <Menu.Item icon="true">
          <Image size="tiny" src="/assets/images/logo.png" href="/" />
          {t('app:title')}
        </Menu.Item>
        <MenuRight />
      </Menu>
      <Grid stretched="true">
        <Grid.Column stretched="true" width={2}>
          <Menu attached="left" vertical="true" fluid="true">
            <Menu.Header>
              <Icon name="book" size="large" link="true">
                <a href="/topics"> Topics</a>
              </Icon>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched="true" width={14}>
          <HomeContainer />
        </Grid.Column>
      </Grid>
    </div>
  );
};


export { HomePage as PureHomePage };
export default translate()(HomePage);
