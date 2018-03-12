// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Container, Feed, Segment, Grid, Menu } from 'semantic-ui-react';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const HomeContent = (): React.Node => {
  return (
    <Container>
      <h1>Recent activity</h1>
      <Feed size="large">
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
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Date>1 Minute Ago</Feed.Date>
            </Feed.Meta>
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
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Date>42 Minutes Ago</Feed.Date>
            </Feed.Meta>
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
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Date>2 Hour Ago</Feed.Date>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Container>
  );
};

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid stretched={true}>
        <Grid.Column stretched={true} width={2}>
          <Menu vertical={true} fluid={true}>
            <Menu.Header>
              <Segment vertical={true}>
                <Link to="/topics">{t('common:link.topics')}</Link>
              </Segment>
            </Menu.Header>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched={true} width={14}>
          <HomeContent />
        </Grid.Column>
      </Grid>
    </Page>
  );
};


const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
