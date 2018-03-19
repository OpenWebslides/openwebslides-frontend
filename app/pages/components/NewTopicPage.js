// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import topics from 'modules/topics';

import Page from '../Page';

const CreateNewTopicCard = topics.components.NewTopicCard;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAll(state).map((topic) => topic.id),
  };
};

const TopicsCollection = topics.components.CardCollection;
type Props = TranslatorProps & { /* new props go here */ };

const PureNewTopicPage = (props: Props): React.Node => {
  const {
    t,
    topicIds,
  } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column>
            <h1>{t('pages:topic_new.title')}</h1>
            <CreateNewTopicCard />
            <TopicsCollection topicIds={topicIds} />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    </Page>
  );
};

const NewTopicPage = connect(mapStateToProps)(translate()(PureNewTopicPage));

export { PureNewTopicPage };
export default NewTopicPage;

