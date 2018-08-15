// @flow

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';

const taskSagaActions = {
  addTopic,
  addTopicId,
  fetch,
  removeTopic,
  removeTopicId,
};

export default taskSagaActions;
