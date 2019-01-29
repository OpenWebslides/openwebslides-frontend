// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`updatePassword`, (): void => {

  let dummyDeviceType: m.DeviceType;

  beforeEach((): void => {
    dummyDeviceType = m.deviceTypes.DESKTOP;
  });

  it(`returns a users UPDATE_DEVICE_TYPE action containing the passed props`, (): void => {
    const expectedAction: a.UpdateDeviceTypeAction = {
      type: a.UPDATE_DEVICE_TYPE,
      payload: {
        deviceType: dummyDeviceType,
      },
    };
    const actualAction = actions.updateDeviceType(dummyDeviceType);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
