// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid } from 'semantic-ui-react';
import feed from 'modules/feed';

import Page from '../Page';

const SocialFeed = feed.components.Feed;

type Props = CustomTranslatorProps;

const PureHomePage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('global:title.recentActivity')}</h1>
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
