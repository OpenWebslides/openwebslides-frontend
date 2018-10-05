// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';

import { sagas } from '..';

describe(`fork`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics apiGet action and waits for the request to complete`, (): void => {
    const dummyAction = actions.fork(dummyId);

    return expectSaga(sagas.fork, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), null],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostFork(dummyId))
      .run();
  });

});
