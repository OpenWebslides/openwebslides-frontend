// @flow

import addTopic from './addTopic';
import addTopicId from './addTopicId';
import fetch from './fetch';
import forkTopic from './forkTopic';
import removeTopic from './removeTopic';
import removeTopicId from './removeTopicId';
import signup from './signup';
import update from './update';
import updatePassword from './updatePassword';

const taskSagaActions = {
  addTopic,
  addTopicId,
  fetch,
  forkTopic,
  removeTopic,
  removeTopicId,
  signup,
  update,
  updatePassword,
};

export default taskSagaActions;
