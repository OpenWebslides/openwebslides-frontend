// @flow

import _ from 'lodash';

import * as t from '../actionTypes';
import * as m from '../model';

const setSettingInState = (
  state: m.PlatformState,
  action: t.SetSettingInStateAction,
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
