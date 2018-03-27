// @flow

import * as React from 'react';
import type { Identifier } from 'types/model';
import { Card } from 'semantic-ui-react';
import TopicCard from './TopicCard';

type PassedProps = {
  topicIds: Array<Identifier>,
};

type Props = PassedProps;

const PureCardCollection = (props: Props): React.Node => {
  const {
    topicIds,
  } = props;

  return (
    <Card.Group>
      {topicIds.map((topicId) => (
        <TopicCard key={topicId} topicId={topicId} />
      ))}
    </Card.Group>
  );
};

const CardCollection = PureCardCollection;

export { PureCardCollection };
export default CardCollection;
