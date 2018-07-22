// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import { getAllTopicIdsByUserId } from '../selectors';
import { getAllByUserId } from '../actions';

import TopicCard from './TopicCard';

type PassedProps = {|
  userId: Identifier,
|};

type StateProps = {|
  topicIds: Array<Identifier>,
|};

type DispatchProps = {|
  handleRequestTopics: (userId: Identifier) => void,
|};

type Props = {|
  ...PassedProps,
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;

  return {
    topicIds: getAllTopicIdsByUserId(state, userId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestTopics: (userId: Identifier): void => {
      dispatch(getAllByUserId(userId));
    },
  };
};

class PureCardCollection extends React.Component<Props, State> {
  componentDidMount = (): void => {
    const { userId, handleRequestTopics } = this.props;
    handleRequestTopics(userId);
  };

  render = (): React.Node => {
    const {
      topicIds,
    } = this.props;

    return (
      <Card.Group>
        {topicIds.map((topicId) => (
          <TopicCard key={topicId} topicId={topicId} />
        ))}
      </Card.Group>
    );
  };
}

const CardCollection = connect(mapStateToProps, mapDispatchToProps)(PureCardCollection);

export { PureCardCollection };
export default CardCollection;
