// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`updatePassword`, (): void => {

  let dummyId: string;
  let dummyCurrentPassword: string;
  let dummyPassword: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyCurrentPassword = 'dummyName';
    dummyPassword = 'dummyLocale';
  });

  it(`puts a users API_PATCH action containing the passed props`, (): void => {
    const dummyAction = actions.updatePassword(dummyId, dummyCurrentPassword, dummyPassword);

    return expectSaga(sagas.updatePassword, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, undefined, undefined, undefined, dummyCurrentPassword, dummyPassword, undefined, undefined, undefined, undefined))
      .run();
  });

});
