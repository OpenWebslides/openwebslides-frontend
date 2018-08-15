// @flow

import { expectSaga } from 'redux-saga-test-plan';

import topics from 'modules/topics';

import actions from '../../actions';

import { sagas } from '..';

describe(`removeTopic`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`puts a topics REMOVE action containing the passed topicId, then puts a users REMOVE_TOPIC_ID action`, (): void => {
    const dummyAction = actions.removeTopic(dummyUserId, dummyTopicId);

    return expectSaga(sagas.removeTopic, dummyAction)
      .put(topics.actions.remove(dummyTopicId))
      .put(actions.removeTopicId(dummyUserId, dummyTopicId))
      .run();
  });

});
