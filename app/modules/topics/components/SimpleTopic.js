// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';

type PassedProps = {|
  topicId: Identifier,
|};

type StateProps = {|
  topic: Topic,
|};

type Props = {|
  ...PassedProps,
  ...StateProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = getById(state, { id: topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  return {
    topic,
  };
};

const PureSimpleTopic = (props: Props): React.Node => {
  const { topic } = props;

  return (
    <Segment basic={true} size="small" secondary={true}>
      <p>{topic.title}</p>
    </Segment>
  );
};

const SimpleTopic = connect(mapStateToProps)(PureSimpleTopic);

export { PureSimpleTopic };
export default SimpleTopic;
