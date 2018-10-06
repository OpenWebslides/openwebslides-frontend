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
  let dummyForkedId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyForkedId = 'dummyForkedId';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a topics apiPostFork action, puts a apiGet action and returns the forked topic id`, (): void => {
    const dummyAction = actions.fork(dummyId);

    return expectSaga(sagas.fork, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST_FORK) ? { id: dummyForkedId } : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? { id: dummyForkedId } : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostFork(dummyId))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyForkedId))
      .returns({ id: dummyForkedId })
      .run();
  });

});
