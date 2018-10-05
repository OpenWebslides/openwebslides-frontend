// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';
import users from 'modules/users';

import actions from '../../actions';

import { sagas } from '..';

describe(`signup`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`puts an users.apiPostUser action`, (): void => {
    const dummyAction = actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);

    return expectSaga(sagas.signup, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === users.actions.apiPost('dummy', 'dummy', 'dummy', true).type) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, users.actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted))
      .run();
  });

});
