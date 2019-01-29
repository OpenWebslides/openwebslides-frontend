// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`updatePassword`, (): void => {

  let dummyId: string;
  let dummyDeviceType: m.DeviceType;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyDeviceType = m.deviceTypes.DESKTOP;
  });

  it(`returns a users UPDATE_DEVICE_TYPE action containing the passed props`, (): void => {
    const expectedAction: a.UpdateDeviceTypeAction = {
      type: a.UPDATE_DEVICE_TYPE,
      payload: {
        id: dummyId,
        deviceType: dummyDeviceType,
      },
    };
    const actualAction = actions.updateDeviceType(dummyId, dummyDeviceType);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
