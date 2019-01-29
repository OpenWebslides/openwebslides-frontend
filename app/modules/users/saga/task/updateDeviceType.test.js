// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';
import { select } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';
import { UnsupportedOperationError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`updateDeviceType`, (): void => {

  let dummyId: string;
  let dummyDeviceType: m.DeviceType;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyDeviceType = m.deviceTypes.DESKTOP;
  });

  it(`puts a users API_PATCH action containing the passed props`, (): void => {
    const dummyAction = actions.updateDeviceType(dummyDeviceType);

    return expectSaga(sagas.updateDeviceType, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: dummyId, apiToken: 'dummyToken' }],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, dummyDeviceType))
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.updateDeviceType(dummyDeviceType);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.API_PATCH) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
