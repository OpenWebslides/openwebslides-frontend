// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_USER_AUTH_IN_STATE: 'platform/SET_USER_AUTH_IN_STATE' = 'platform/SET_USER_AUTH_IN_STATE';
export const SET_SETTING_IN_STATE: 'platform/SET_SETTING_IN_STATE' = 'platform/SET_SETTING_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetUserAuthInStateAction = {|
  ...ReducerAction,
  type: typeof SET_USER_AUTH_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    userAuth: ?m.UserAuth,
  |},
|};

export type SetSettingInStateAction = {|
  ...ReducerAction,
  type: typeof SET_SETTING_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    keyValuePair: m.UserSetting,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type PlatformReducerAction =
  | SetUserAuthInStateAction
  | SetSettingInStateAction;
