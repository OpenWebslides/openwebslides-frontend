// @flow

import type { FeedItemsState } from './model';
import { predicateTypes } from './model';

export const dummyFeedItems: FeedItemsState = {
  jkjkjk0000: {
    id: 'jkjkjk0000',
    userId: 'markfrank1',
    topicId: 'aaaaaaaaa0',
    predicate: predicateTypes.CREATE,
    timestamp: 1511622599112,
  },
  jkjkjk1234: {
    id: 'jkjkjk1234',
    userId: 'markfrank1',
    topicId: 'aaaaaaaaaa',
    predicate: predicateTypes.CREATE,
    timestamp: 1520500166787,
  },
  jkjkjk5678: {
    id: 'jkjkjk5678',
    userId: 'markfrank1',
    topicId: 'aaaaaaaaaa',
    predicate: predicateTypes.DELETE,
    timestamp: 1520790166787,
  },
  jkjkjk9012: {
    id: 'jkjkjk9012',
    userId: 'markfrank1',
    topicId: 'bbbbbbbbbb',
    predicate: predicateTypes.COMMENT,
    timestamp: 1521622599112,
  },
  jkjkjk3456: {
    id: 'jkjkjk3456',
    userId: 'johan12345',
    topicId: 'bbbbbbbbbb',
    predicate: predicateTypes.FORK,
    timestamp: 1521627599112,
  },
};
