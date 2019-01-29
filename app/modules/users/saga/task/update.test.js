// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyAge: number;
  let dummyGender: m.GenderType;
  let dummyRole: m.RoleType;
  let dummyCountry: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
    dummyAge = 18;
    dummyGender = m.genderTypes.MALE;
    dummyRole = m.roleTypes.LEARNER;
    dummyCountry = 'BE';
  });

  it(`puts a users API_PATCH action containing the passed props, then puts a users FETCH action`, (): void => {
    const dummyAction = actions.update(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyAge, dummyGender, dummyRole, dummyCountry);

    return expectSaga(sagas.update, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, undefined, undefined, dummyAge, dummyGender, dummyRole, dummyCountry))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
