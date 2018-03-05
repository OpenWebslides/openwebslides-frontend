// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
// import { Link } from 'react-router-dom';
import { Divider, Icon, Container, Image, Menu } from 'semantic-ui-react';

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
        <Icon.Group size="large">
          <Icon size="large" name="thin circle" />
          <Icon name="bell outline" />
        </Icon.Group>
      </Menu.Item>
      <Menu.Item className="ui right aligned category search item">
        <h2>Professor X</h2>
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
      <Menu attached="top">
        <Menu.Item icon="true">
          <Image size="tiny" src="/assets/images/logo.png" href="/" />
          {t('app:title')}
        </Menu.Item>
        <MenuRight />
      </Menu>
      <HomeContainer />
    </div>
  );
};
/*
  <div className="ui bottom attached pushable">
    <Sidebar attached="left" as={Menu} visible="true" className="very thin inverted" vertical="true" >
      <Menu.Item name="library">
        <Icon name="book" size="large" link="true" href="/topics" />
      </Menu.Item>
    </Sidebar>
    <div className="pusher">
      <h1>Test</h1>
      <p>LALALALLALALALALALLALALALALALLALALALALALLALALALALALLALALALALALLALALALALALLALA</p>
    </div>
  </div>
*/

export { HomePage as PureHomePage };
export default translate()(HomePage);
