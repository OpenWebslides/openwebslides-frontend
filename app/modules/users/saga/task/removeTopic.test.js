// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`removeTopic`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`puts a topics REMOVE action containing the passed topicId, then puts a users REMOVE_TOPIC_ID action, and waits for request completion`, (): void => {
    const dummyAction = actions.removeTopic(dummyUserId, dummyTopicId);

    return expectSaga(sagas.removeTopic, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === topics.actionTypes.REMOVE) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.REMOVE_TOPIC_ID) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, topics.actions.remove(dummyTopicId))
      .call(asyncRequests.lib.putAndReturn, actions.removeTopicId(dummyUserId, dummyTopicId))
      .run();
  });

});
