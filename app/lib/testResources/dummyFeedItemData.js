// @flow

import feedItems from 'modules/feedItems';

export const feedItem: feedItems.model.FeedItem = {
  id: 'dummyFeedItemId',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: feedItems.model.feedItemTypes.CREATE,
  timestamp: 1524490428,
};

export const feedItem2: feedItems.model.FeedItem = {
  id: 'dummyFeedItem2Id',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: feedItems.model.feedItemTypes.UPDATE,
  timestamp: 1524890428,
};

export const feedItem3: feedItems.model.FeedItem = {
  id: 'dummyFeedItem3Id',
  userId: 'dummyUserId',
  topicId: 'dummyTopicId',
  type: feedItems.model.feedItemTypes.FORK,
  timestamp: 1224890428,
};
