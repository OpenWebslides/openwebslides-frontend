// @flow
/* eslint-disable import/prefer-default-export */

import type { Identifier } from 'types/model';

export type FeedItem = {
  +id: Identifier,
  +userId: Identifier,
  +topicId: Identifier,
  +predicate: string,
  +timestamp: Date,
};

export type FeedItemsState = {
  +[feedItemId: string]: FeedItem,
};

