// @flow

import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import asyncRequests from 'modules/asyncRequests';

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
    const dummyAction = actions.updateDeviceType(dummyId, dummyDeviceType);

    return expectSaga(sagas.updateDeviceType, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, dummyDeviceType))
      .run();
  });

});
