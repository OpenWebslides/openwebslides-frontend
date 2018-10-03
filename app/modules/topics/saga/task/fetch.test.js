// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fetch`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics apiGet action and waits for the request to complete`, (): void => {
    const dummyAction = actions.fetch(dummyId);

    return expectSaga(sagas.fetch, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_GET) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiGet(dummyId))
      .run();
  });

});
