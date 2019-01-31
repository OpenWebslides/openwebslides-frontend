// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header, Divider, Button, Card, Icon } from 'semantic-ui-react';

import { TOPIC_NEW_ROUTE } from 'config/routes';

import TopicCard from './TopicCard';

type PassedProps = {|
  topicIds: $ReadOnlyArray<string>,
  isCurrentUser: boolean,
  onRemoveTopic: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureTopicsList = (props: Props): React.Node => {
  const { t, topicIds, isCurrentUser, onRemoveTopic } = props;
  return (
    <>
      <div style={{ width: '100%', overflow: 'hidden', padding: '1rem 0 0' }}>
        {(isCurrentUser ? (
          <Button
            as={Link}
            to={TOPIC_NEW_ROUTE}
            primary={true}
            floated="right"
            className="topics-list__add-button"
            data-test-id="topics-list-add-button"
          >
            <Icon name="plus" />
            {t('library:buttons.create')}
          </Button>
        ) : null)}
        <Header as="h3" floated="left">{t('global:title.library')}</Header>
      </div>
      <Divider />
      {(topicIds.length === 0 ? (
        <em data-test-id="topics-list-empty">{t('library:empty')}</em>
      ) : null)}
      <Card.Group itemsPerRow={3} doubling={true} stackable={true}>
        {[...topicIds].reverse().map((topicId) => (
          <TopicCard
            key={topicId}
            topicId={topicId}
            isCurrentUser={isCurrentUser}
            onRemoveTopic={onRemoveTopic}
          />
        ))}
      </Card.Group>
    </>
  );
};

const TopicsList = withNamespaces()(PureTopicsList);

export { PureTopicsList };
export default TopicsList;
