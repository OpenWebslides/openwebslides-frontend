// @flow

import topics from 'modules/topics';

export const topic: topics.model.Topic = {
  id: 'dummyTopic',
  title: 'Dummy Topic',
  description: 'This is a dummy topic for testing purposes',
  rootContentItemId: 'dummyRootContentItemId',
  upstreamTopicId: null,
  isContentFetched: false,
};

export const topic2: topics.model.Topic = {
  id: 'dummyTopic2',
  title: 'Anoterh dummy Topic',
  description: null,
  rootContentItemId: 'dummyRootContentItemId',
  upstreamTopicId: null,
  isContentFetched: false,
};

export const topic3: topics.model.Topic = {
  id: 'dummyTopic3',
  title: 'This topic is a dummy',
  description: null,
  rootContentItemId: 'dummyRootContentItemId',
  upstreamTopicId: null,
  isContentFetched: false,
};

export const topic4: topics.model.Topic = {
  id: 'dummyTopic4',
  title: 'Lorme ipsum dolor sit amet',
  description: 'Lorem ipsum descriptium',
  rootContentItemId: 'dummyRootContentItemId',
  upstreamTopicId: null,
  isContentFetched: false,
};
