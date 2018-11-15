// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header, Grid, Button, Card } from 'semantic-ui-react';

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
    <Grid padded={true}>
      <Grid.Row>
        <div style={{ width: '100%' }}>
          {(isCurrentUser ? (
            <Button
              as={Link}
              to={TOPIC_NEW_ROUTE}
              primary={true}
              floated="right"
              className="topics-list__add-button"
              data-test-id="topics-list-add-button"
            >
              {t('global:title.createNewTopic')}
            </Button>
          ) : null)}
          <Header as="h3" floated="left">{t('global:title.library')}</Header>
        </div>
      </Grid.Row>
      <Grid.Row>
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
      </Grid.Row>
    </Grid>
  );
};

const TopicsList = withNamespaces()(PureTopicsList);

export { PureTopicsList };
export default TopicsList;
