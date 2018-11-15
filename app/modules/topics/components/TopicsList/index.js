// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header, Grid, Button, Card, Icon } from 'semantic-ui-react';

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
          primary={true}
          size="big"
          className="topics-list__add-button"
          data-test-id="topics-list-add-button"
        >
          {t('global:title.createNewTopic')}
        </Button>
      </Card>
    );
  };

  render(): React.Node {
    const { t, topicIds, isCurrentUser, onRemoveTopic } = this.props;
    return (
      <Grid padded={true}>
        <Grid.Row>
          <Header>{t('global:title.library')}</Header>
        </Grid.Row>
        <Grid.Row>
          <Card.Group itemsPerRow={3} doubling={true} stackable={true}>
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
        </Grid.Row>
      </Grid>
    );
  }
}

const TopicsList = withNamespaces()(PureTopicsList);

export { PureTopicsList };
export default TopicsList;
