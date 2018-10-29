// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

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

  it(`puts a pullRequests apiPost action and returns the apiPost result`, (): void => {
    const dummyAction = actions.submit(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    return expectSaga(sagas.submit, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST) ? { id: dummyId } : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId))
      .returns({ id: dummyId })
      .run();
  });

});
