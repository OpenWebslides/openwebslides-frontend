// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Feed, Grid } from 'semantic-ui-react';

import student from 'assets/images/avatar/student_m.jpg';
import professor from 'assets/images/avatar/professor.jpg';
import professor2 from 'assets/images/avatar/professor2.jpg';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:home.title')}</h1>
            <Feed size="large">
              <Feed.Event>
                <Feed.Label>
                  <img src={student} alt="profile" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>Student U </Feed.User>
                    {t('feed:feed_item.comment', { action: 'commented on', object: 'topic' })}
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
                  <img src={professor2} alt="profile" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>Professor W</Feed.User>
                    {t('feed:feed_item.deleteTopic', { action: 'deleted', object: 'topic' })}
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
                  <img src={professor} alt="profile" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>Professor X </Feed.User>
                    {t('feed:feed_item.createTopic', { action: 'created', object: 'topic' })}
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
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};


const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
