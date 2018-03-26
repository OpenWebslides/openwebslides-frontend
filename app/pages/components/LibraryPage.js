// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import topics from 'modules/topics';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Page from '../Page';

type StateProps = {
  topicIds: Array<Identifier>,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAllTopicIdsWithUserId(state, 'johanjohan'),
  };
};

const TopicsCollection = topics.components.CardCollection;

const PureLibraryPage = (props: Props): React.Node => {
  const {
    t,
    topicIds,
  } = props;

  return (
    <Page>
      <Grid.Row>
        <Grid padded="vertically">
          <Grid.Column width={12}>
            <h1>{t('pages:library.title')}</h1>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button floated="right">
              <Link to="/topics/new">{t('common:link.newtopic')}</Link>
            </Button>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row>
        <TopicsCollection topicIds={topicIds} />
      </Grid.Row>
    </Page>
  );
};

const LibraryPage = connect(mapStateToProps)(translate()(PureLibraryPage));

export { PureLibraryPage };
export default LibraryPage;

