// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { Segment } from 'semantic-ui-react';
import type { Topic } from '../model';
import { getById } from '../selectors';

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