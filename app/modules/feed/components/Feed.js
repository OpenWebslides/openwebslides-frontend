// @flow

import * as React from 'react';
import type { Identifier } from 'types/model';

import { Feed } from 'semantic-ui-react';

import Event from './Event';

type PassedProps = {
  eventIds: Array<Identifier>,
};

type Props = PassedProps;

const FeedWrapper = (props: Props): React.Node => {
  const {
    eventIds,
  } = props;

  return (
    <Feed size="large">
      {eventIds.map((eventId) => (
        <Event key={eventId} eventId={eventId} />
      ))}
    </Feed>
  );
};

export default FeedWrapper;
