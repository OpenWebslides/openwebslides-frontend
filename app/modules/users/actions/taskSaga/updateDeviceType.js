// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const updateDeviceType = (
  deviceType: m.DeviceType,
): a.UpdateDeviceTypeAction => {
  return {
    type: a.UPDATE_DEVICE_TYPE,
    payload: {
      deviceType,
    },
  };
};

export default updateDeviceType;
