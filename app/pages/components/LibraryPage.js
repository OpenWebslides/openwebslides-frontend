// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import topics from 'modules/topics';

import Page from '../Page';

type StateProps = {
  topicIds: Array<Identifier>,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAll(state).map((topic) => topic.id),
  };
};

const TopicsCollection = topics.components.CardCollection;

const PureLibraryPage = (props: Props): React.Node => {
  const { topicIds } = props;

  return (
    <Page>
      <TopicsCollection topicIds={topicIds} />
    </Page>
  );
};

const LibraryPage = connect(mapStateToProps)(translate()(PureLibraryPage));

export { PureLibraryPage };
export default LibraryPage;

