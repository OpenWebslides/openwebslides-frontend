// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

import { UnsupportedOperationError } from 'errors';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import platform from 'modules/platform';

import { getAllTopicIdsByUserId } from '../selectors';
import { getAllByUserId } from '../actions';

import TopicCard from './TopicCard';

type StateProps = {|
  topicIds: Array<Identifier>,
  userId: Identifier,
|};

type DispatchProps = {|
  handleRequestTopics: (userId: Identifier) => void,
|};

type Props = {|
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  if (userAuth == null) {
    throw new UnsupportedOperationError(`This shouldn't happen`);
  }

  return {
    topicIds: getAllTopicIdsByUserId(state, userAuth.userId),
    userId: userAuth.userId,
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
