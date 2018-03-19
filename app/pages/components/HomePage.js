// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';
import feedItems from 'modules/feed-items';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };


const SocialFeed = feedItems.components.FeedCollection;

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:home.title')}</h1>
            <SocialFeed />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};


const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
