// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';

import { TOPIC_NEW_ROUTE } from 'config/routes';

import TopicCard from './TopicCard';

type PassedProps = {|
  topicIds: $ReadOnlyArray<string>,
  isCurrentUser: boolean,
  onRemoveTopic: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureTopicsList extends React.Component<Props> {
  renderNewTopicButton = (): React.Node => {
    const { t, isCurrentUser } = this.props;
    return (isCurrentUser === false) ? null : (
      <Card>
        <Button
          as={Link}
          to={TOPIC_NEW_ROUTE}
          icon={true}
          labelPosition="left"
          size="big"
          className="topics-list__add-button"
          data-test-id="topics-list-add-button"
        >
          <Icon name="plus" />
          {t('global:title.createNewTopic')}
        </Button>
      </Card>
    );
  };

  render(): React.Node {
    const { topicIds, isCurrentUser, onRemoveTopic } = this.props;
    return (
      <Card.Group itemsPerRow={4} doubling={true} stackable={true}>
        {this.renderNewTopicButton()}
        {[...topicIds].reverse().map((topicId) => (
          <TopicCard
            key={topicId}
            topicId={topicId}
            isCurrentUser={isCurrentUser}
            onRemoveTopic={onRemoveTopic}
          />
        ))}
      </Card.Group>
    );
  }
}

const TopicsList = translate()(PureTopicsList);

export { PureTopicsList };
export default TopicsList;
