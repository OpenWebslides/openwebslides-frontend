// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const setSettingInState = (keyValuePair: m.UserSetting): a.SetSettingInStateAction => {
  return {
    type: a.SET_SETTING_IN_STATE,
    payload: {
      keyValuePair,
    },
  };
};

export default setSettingInState;
