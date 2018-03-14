// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import topics from 'modules/topics';

type StateProps = {
  topicIds: Array<Identifier>,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAll(state).map((topic) => topic.id),
  };
};

const TopicsList = topics.components.List;

const PureTopicsPage = (props: Props): React.Node => {
  const { topicIds } = props;

  return (
    <div>
      <TopicsList topicIds={topicIds} />
    </div>
  );
};

const TopicsPage = connect(mapStateToProps)(translate()(PureTopicsPage));

export { PureTopicsPage };
export default TopicsPage;
