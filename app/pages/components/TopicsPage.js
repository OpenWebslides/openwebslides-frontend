// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import topics from 'modules/topics';

type StateProps = {
  topicIds: Array<string>,
};

type Props = TranslatorProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    topicIds: topics.selectors.getAll(state).map((topic) => topic.id),
  };
};

const TopicsPage = (props: Props): React.Node => {
  const { topicIds } = props;
  const TopicsList = topics.components.components.list;

  return (
    <div>
      <TopicsList topicIds={topicIds} />
    </div>
  );
};

export default connect(mapStateToProps)(translate()(TopicsPage));
