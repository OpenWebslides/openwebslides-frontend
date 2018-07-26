// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';

import type { State } from 'types/state';
import { TOPIC_NEW_ROUTE } from 'config/routes';

import { getAllTopicIdsByUserId } from '../selectors';
import { getAllByUserId } from '../actions';

import TopicCard from './TopicCard';

type PassedProps = {|
  userId: string,
|};

type StateProps = {|
  topicIds: Array<string>,
|};

type DispatchProps = {|
  handleRequestTopics: (userId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;

  return {
    topicIds: getAllTopicIdsByUserId(state, userId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestTopics: (userId: string): void => {
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
    const { t, topicIds } = this.props;

    return (
      <Card.Group itemsPerRow={4} doubling={true}>
        <Card>
          <Button
            as={Link}
            to={TOPIC_NEW_ROUTE}
            icon={true}
            labelPosition="left"
            size="big"
            className="topics-list__add-button"
          >
            <Icon name="plus" />
            {t('global:title.createNewTopic')}
          </Button>
        </Card>
        {topicIds.map((topicId) => (
          <TopicCard key={topicId} topicId={topicId} />
        ))}
      </Card.Group>
    );
  };
}

const CardCollection = connect(mapStateToProps, mapDispatchToProps)(
  translate()(PureCardCollection),
);

export { PureCardCollection };
export default CardCollection;
