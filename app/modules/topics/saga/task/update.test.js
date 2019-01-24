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
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyAccess: m.AccessType;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
    dummyAccess = m.accessTypes.PUBLIC;
  });

  it(`puts a topics apiPatch action, and a fetch action`, (): void => {
    const dummyAction = actions.update(dummyId, dummyTitle, dummyDescription, dummyAccess);

    return expectSaga(sagas.update, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, dummyTitle, dummyDescription, dummyAccess))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyId))
      .run();
  });

});
