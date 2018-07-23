// @flow

import _ from 'lodash';

import * as a from '../actionTypes';
import * as m from '../model';

const setSettingInState = (
  state: m.PlatformState,
  action: a.SetSettingInStateAction,
): m.PlatformState => {
  const { keyValuePair } = action.payload;
  const key = _.keys(keyValuePair)[0];
  const value = keyValuePair[key];

  if (_.isEqual(state.settings[key], value)) {
    return state;
  }
  else {
    return {
      ...state,
      settings: {
        ...state.settings,
        ...keyValuePair,
      },
    };
  }
};

export default setSettingInState;
