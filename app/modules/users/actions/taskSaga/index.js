// @flow

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import forkTopic from './forkTopic';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';
import signup from './signup';

const taskSagaActions = {
  addTopic,
  addTopicId,
  fetch,
  forkTopic,
  removeTopic,
  removeTopicId,
  signup,
};

export default taskSagaActions;
