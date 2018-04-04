// @flow

import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import topics from 'modules/topics';

import Page from '../Page';

const CreateNewTopicCard = topics.components.NewTopicCard;

type Props = TranslatorProps;

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:topic_new.title')}</h1>
            <CreateNewTopicCard />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};

const NewTopicPage = translate()(PureNewTopicPage);

export { PureNewTopicPage };
export default NewTopicPage;

