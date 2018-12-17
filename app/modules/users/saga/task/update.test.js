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
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
  });

  it(`puts a users API_PATCH action containing the passed props, then puts a users FETCH action`, (): void => {
    const dummyAction = actions.update(dummyId, dummyName, dummyLocale, dummyAlertEmails);

    return expectSaga(sagas.update, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, undefined, undefined))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
