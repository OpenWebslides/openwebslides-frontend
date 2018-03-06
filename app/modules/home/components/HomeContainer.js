// @flow

import * as React from 'react';
import { Container, Divider } from 'semantic-ui-react';

import HomeSocialFeed from './HomeSocialFeed';
import HomeSearchSection from './HomeSearchSection';

const HomeContainer = (): React.Node => {
  return (
    <Container>
      <HomeSocialFeed />
      <Divider section="true" />
      <HomeSearchSection />
    </Container>
  );
};

export default HomeContainer;
