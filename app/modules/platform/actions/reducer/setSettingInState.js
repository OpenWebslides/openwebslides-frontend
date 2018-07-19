// @flow

import * as t from '../../actionTypes';
import * as m from '../../model';

const setSettingInState = (keyValuePair: m.UserSetting): t.SetSettingInStateAction => {
  return {
    type: t.SET_SETTING_IN_STATE,
    payload: {
      keyValuePair,
    },
  };
};

export default setSettingInState;
