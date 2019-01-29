// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const updateDeviceType = (
  id: string,
  deviceType: m.DeviceType,
): a.UpdateDeviceTypeAction => {
  return {
    type: a.UPDATE_DEVICE_TYPE,
    payload: {
      id,
      deviceType,
    },
  };
};

export default updateDeviceType;
