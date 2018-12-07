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
          if (action.type === a.API_PATCH
            && action.payload.name === dummyName
            && action.payload.locale === dummyLocale
            && action.payload.alertEmails === dummyAlertEmails) {
            return null;
          }
          else return next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
