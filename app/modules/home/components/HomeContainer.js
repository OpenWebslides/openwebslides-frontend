// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

import HomeSocialFeed from './HomeSocialFeed';

const HomeContainer = (): React.Node => {
  return (
    <Container>
      <HomeSocialFeed />
    </Container>
  );
};

export default HomeContainer;
