// @flow

import * as React from 'react';
import type { Identifier } from 'types/model';

import { Feed } from 'semantic-ui-react';

import FeedItem from './FeedItem';

type PassedProps = {
  feedItemIds: Array<Identifier>,
};

type Props = PassedProps;

const FeedCollection = (props: Props): React.Node => {
  const {
    feedItemIds,
  } = props;

  return (
    <Feed size="large">
      {feedItemIds.map((feedItemId) => (
        <FeedItem key={feedItemId} feedItemId={feedItemId} />
      ))}
    </Feed>
  );
};

export default FeedCollection;
