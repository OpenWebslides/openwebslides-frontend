// @flow

/* eslint-disable flowtype/require-types-at-top */

const COMMENT: 'feedItemTypes/COMMENT' = 'feedItemTypes/COMMENT';
const CREATE: 'feedItemTypes/CREATE' = 'feedItemTypes/CREATE';
const FORK: 'feedItemTypes/FORK' = 'feedItemTypes/FORK';
const UPDATE: 'feedItemTypes/UPDATE' = 'feedItemTypes/UPDATE';

export const feedItemTypes = {
  COMMENT,
  CREATE,
  FORK,
  UPDATE,
};

export type FeedItemType = $Values<typeof feedItemTypes>;

export type FeedItem = {|
  +id: string,
  +userId: string,
  +topicId: string,
  +type: FeedItemType,
  +timestamp: number,
|};

// eslint-disable-next-line flowtype/require-exact-type
export type FeedItemsById = {
  +[id: string]: FeedItem,
};

export type FeedItemsState = {|
  +byId: FeedItemsById,
|};
