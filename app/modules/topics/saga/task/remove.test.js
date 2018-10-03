// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`remove`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics apiDelete action, then puts a topics removeFromState action`, (): void => {
    const dummyAction = actions.remove(dummyId);

    return expectSaga(sagas.remove, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_DELETE) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiDelete(dummyId))
      .put(actions.removeFromState(dummyId))
      .run();
  });

});
