// @flow

import topics from 'modules/topics';

export const topic: topics.model.Topic = {
  id: 'dummyTopic',
  title: 'Dummy Topic',
  description: 'This is a dummy topic for testing purposes',
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: null,
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const topic2: topics.model.Topic = {
  id: 'dummyTopic2',
  title: 'Anoterh dummy Topic',
  description: null,
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: null,
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const topic3: topics.model.Topic = {
  id: 'dummyTopic3',
  title: 'This topic is a dummy',
  description: null,
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: null,
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const topic4: topics.model.Topic = {
  id: 'dummyTopic4',
  title: 'Lorme ipsum dolor sit amet',
  description: 'Lorem ipsum descriptium',
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: null,
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const upstream: topics.model.Topic = {
  id: 'upstreamTopic',
  title: 'Lorme ipsum dolor sit amet',
  description: 'Lorem ipsum descriptium',
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: null,
  forkedTopicIds: ['downstreamTopic', 'downstreamTopic2'],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const downstream: topics.model.Topic = {
  id: 'downstreamTopic',
  title: 'Lorme ipsum dolor sit amet',
  description: 'Lorem ipsum descriptium',
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: 'upstreamTopic',
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};

export const downstream2: topics.model.Topic = {
  id: 'downstreamTopic2',
  title: 'Lorme ipsum dolor sit amet',
  description: 'Lorem ipsum descriptium',
  access: topics.model.accessTypes.PUBLIC,
  userId: 'dummyUserId',
  rootContentItemId: 'dummyRootContentItemId',
  timestamp: 1540833592,
  upstreamTopicId: 'upstreamTopic',
  forkedTopicIds: [],
  incomingPullRequestIds: [],
  outgoingPullRequestIds: [],
  collaboratorUserIds: [],
  isContentFetched: false,
  isDirty: false,
};
