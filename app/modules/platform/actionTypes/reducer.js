// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_USER_AUTH_IN_STATE: 'platform/SET_USER_AUTH_IN_STATE' = 'platform/SET_USER_AUTH_IN_STATE';
export const SET_SETTING_IN_STATE: 'platform/SET_SETTING_IN_STATE' = 'platform/SET_SETTING_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetUserAuthInStateAction = {|
  type: typeof SET_USER_AUTH_IN_STATE,
  payload: {
    userAuth: ?m.UserAuth,
  },
|};

export type SetSettingInStateAction = {|
  type: typeof SET_SETTING_IN_STATE,
  payload: {
    keyValuePair: m.UserSetting,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type PlatformReducerAction =
  | SetUserAuthInStateAction
  | SetSettingInStateAction;
