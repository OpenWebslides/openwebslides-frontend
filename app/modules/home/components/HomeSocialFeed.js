// @flow

import * as React from 'react';
import { Container } from 'semantic-ui-react';

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

export default HomeSocialFeed;
