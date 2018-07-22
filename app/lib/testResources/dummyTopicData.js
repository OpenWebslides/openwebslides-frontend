// @flow

import topics from 'modules/topics';

const { model } = topics;

export const topic: $Exact<model.Topic> = {
  id: 'dummyTopic',
  title: 'Dummy Topic',
  description: 'This is a dummy topic for testing purposes',
  rootContentItemId: 'dummyRootContentItemId',
  userId: 'dummyUserId',
};

export const topic2: $Exact<model.Topic> = {
  id: 'dummyTopic2',
  title: 'Anoterh dummy Topic',
  description: null,
  rootContentItemId: 'dummyRootContentItemId',
  userId: 'dummyUserId',
};
