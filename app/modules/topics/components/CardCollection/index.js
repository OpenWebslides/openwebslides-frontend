// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';

import { TOPIC_NEW_ROUTE } from 'config/routes';

import TopicCard from './TopicCard';

type PassedProps = {|
  topicIds: $ReadOnlyArray<string>,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureCardCollection = (props: Props): React.Node => {
  const { t, topicIds } = props;

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

const CardCollection = translate()(PureCardCollection);

export { PureCardCollection };
export default CardCollection;
