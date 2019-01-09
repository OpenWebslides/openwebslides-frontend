// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyFeedback: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyFeedback = 'dummyFeedback';
  });

  it(`puts a pullRequests API_PATCH action containing the passed props (and 'accept' as state event), then puts a pullRequests FETCH action`, (): void => {
    const dummyAction = actions.accept(dummyId, dummyFeedback);

    return expectSaga(sagas.accept, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, 'accept', dummyFeedback))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
