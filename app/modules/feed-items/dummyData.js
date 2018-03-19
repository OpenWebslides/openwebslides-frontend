// @flow

import type { FeedItemsState } from './model';
import { predicateTypes } from './model';

export const dummyFeedItems: FeedItemsState = {
  jkjkjk1234: {
    id: 'jkjkjk1234',
    userId: 'jasperdhae',
    topicId: 'aaaaaaaaaa',
    predicate: predicateTypes.CREATE,
    timestamp: 1521470684,
  },
  jkjkjk5678: {
    id: 'jkjkjk5678',
    userId: 'jasperdhae',
    topicId: 'aaaaaaaaaa',
    predicate: predicateTypes.DELETE,
    timestamp: 1521472684,
  },
  jkjkjk9012: {
    id: 'jkjkjk9012',
    userId: 'jasperdhae',
    topicId: 'bbbbbbbbbb',
    predicate: predicateTypes.COMMENT,
    timestamp: 1521570684,
  },
  jkjkjk3456: {
    id: 'jkjkjk3456',
    userId: 'florian123',
    topicId: 'bbbbbbbbbb',
    predicate: predicateTypes.FORK,
    timestamp: 1521580684,
  },
};


/* +id: Identifier,
  +userId: Identifier,
  +topicId: Identifier,
  +predicate: string,
  +timestamp: Date,
  */
