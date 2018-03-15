// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import { getById } from '../selectors';
import type { Topic } from '../model';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    topic: getById(state, props.topicId),
  };
};

const PureTopicCard = (props: Props): React.Node => {
  const { topic } = props;

  return (
    <Card>
      <Card.Content header={topic.title} />
      <Card.Content description={topic.description} />
    </Card>
  );
};

const TopicCard = connect(mapStateToProps)(PureTopicCard);

export { PureTopicCard };
export default TopicCard;
