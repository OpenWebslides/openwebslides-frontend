// @flow

import * as React from 'react';
import { Container, Feed } from 'semantic-ui-react';

const HomeSocialFeed = (): React.Node => {
  return (
    <Container>
      <h1>Social feed</h1>
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="/assets/images/avatar/student_m.jpg" alt="profile" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Student U </Feed.User> commented on topic
              <strong>
                {`
                  "Analysis of UV light"
                `}
              </strong>
              <Feed.Date>1 Minute Ago</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label>
            <img src="/assets/images/avatar/professor2.jpg" alt="profile" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Professor W</Feed.User> deleted topic
              <strong>
                {`
                  "The genesis of the WWW"
                `}
              </strong>
              <Feed.Date>42 Minutes Ago</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label>
            <img src="/assets/images/avatar/professor.jpg" alt="profile" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Professor X</Feed.User>  created topic
              <strong>
                {`
                  "Introduction to mutations in modern biology"
                `}
              </strong>
              <Feed.Date>2 Hour Ago</Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Container>
  );
};

export default HomeSocialFeed;
