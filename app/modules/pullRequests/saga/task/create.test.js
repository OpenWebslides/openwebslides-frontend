// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import topics from 'modules/topics';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`create`, (): void => {

  let dummyId: string;
  let dummyMessage: string;
  let dummySourceTopicId: string;
  let dummyTargetTopicId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyMessage = 'dummyMessage';
    dummySourceTopicId = 'dummySourceTopicId';
    dummyTargetTopicId = 'dummyTargetTopicId';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a pullRequests API_POST action, a pullRequests FETCH action and two topics FETCH actions and returns the generated ID`, (): void => {
    const dummyAction = actions.create(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST) ? { id: dummyId } : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === topics.actionTypes.FETCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .call(asyncRequests.lib.putAndReturn, topics.actions.fetch(dummySourceTopicId))
      .call(asyncRequests.lib.putAndReturn, topics.actions.fetch(dummyTargetTopicId))
      .returns({ id: dummyId })
      .run();
  });

});
