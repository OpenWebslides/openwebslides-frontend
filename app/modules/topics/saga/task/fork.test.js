// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import users from 'modules/users';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fork`, (): void => {

  let dummyId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a topics apiPostFork and an addTopicId action`, (): void => {
    const dummyAction = actions.fork(dummyId);

    return expectSaga(sagas.fork, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST_FORK) ? { userId: dummyUserId, topicId: dummyId } : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostFork(dummyId))
      .put(users.actions.addTopicId(dummyUserId, dummyId))
      .run();
  });

});
