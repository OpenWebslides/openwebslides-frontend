// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import topics from 'modules/topics';
import { CURRENT_USER } from 'modules/users/constants';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Page from '../Page';

type StateProps = {
  topicIds: Array<Identifier>,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAllTopicIdsByUserId(state, CURRENT_USER),
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>{t('pages:library.title')}</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <Link to="/topics/new">
              <Button as="span">
                {t('common:link.newtopic')}
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <TopicsCollection topicIds={topicIds} />
        </Grid.Row>
      </Grid>
    </Page>
  );
};

const LibraryPage = connect(mapStateToProps)(translate()(PureLibraryPage));

export { PureLibraryPage };
export default LibraryPage;

