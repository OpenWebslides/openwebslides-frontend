// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Identifier } from 'types/model';
import { Card } from 'semantic-ui-react';
import type { State } from 'types/state';

import authentication from 'modules/authentication';

import TopicCard from './TopicCard';

import { getAllTopicIdsByUserId } from '../selectors';
import { getAllByUserId } from '../actions';

const { getAccount } = authentication.selectors;

type StateProps = {
  topicIds: Array<Identifier>,
  userId: Identifier,
};

type DispatchProps = {
  handleRequestTopics: (userId: Identifier) => void,
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  // TODO: does this need null checks or is it impossible to access when not logged in?
  const CURRENT_USER = account != null ? account.id : 'jantje1234';

  console.log(CURRENT_USER);

  return {
    topicIds: getAllTopicIdsByUserId(state, CURRENT_USER),
    userId: CURRENT_USER,
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
    this.props.handleRequestTopics(this.props.userId);
  }

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
