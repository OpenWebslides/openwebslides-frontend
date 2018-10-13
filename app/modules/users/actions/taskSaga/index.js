// @flow

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import create from './create';
import fetch from './fetch';
import forkTopic from './forkTopic';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';

const taskSagaActions = {
  addTopic,
  addTopicId,
  create,
  fetch,
  forkTopic,
  removeTopic,
  removeTopicId,
};

export default taskSagaActions;
