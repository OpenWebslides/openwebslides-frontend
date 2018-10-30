// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fetchAll`, (): void => {

  let dummyUserId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
  });

  it(`puts a feedItems apiGetAll action`, (): void => {
    const dummyAction = actions.fetchAll(dummyUserId);

    return expectSaga(sagas.fetchAll, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_GET_ALL_BY_USER_ID) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiGetAllByUserId(dummyUserId))
      .run();
  });

});
