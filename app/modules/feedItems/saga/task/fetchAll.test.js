// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fetchAll`, (): void => {

  it(`puts a feedItems apiGetAll action`, (): void => {
    const dummyAction = actions.fetchAll();

    return expectSaga(sagas.fetchAll, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_GET_ALL) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiGetAll())
      .run();
  });

});
