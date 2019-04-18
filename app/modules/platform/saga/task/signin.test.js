// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`signin`, (): void => {

  let dummyEmail: string;
  let dummyPassword: string;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';
  });

  it(`puts an API_POST_TOKEN action, and a REFRESH action`, (): void => {
    const dummyAction = actions.signin(dummyEmail, dummyPassword);

    return expectSaga(sagas.signin, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_POST_TOKEN || action.type === a.REFRESH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPostToken(dummyEmail, dummyPassword))
      .call(asyncRequests.lib.putAndReturn, actions.refresh())
      .run();
  });

});
