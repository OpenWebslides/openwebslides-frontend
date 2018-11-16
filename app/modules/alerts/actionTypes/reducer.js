// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const MARK_AS_READ_IN_STATE: 'topics/MARK_AS_READ_IN_STATE' = 'topics/MARK_AS_READ_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'alerts/SET_MULTIPLE_IN_STATE' = 'alerts/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type MarkAsReadInStateAction = {|
  ...ReducerAction,
  type: typeof MARK_AS_READ_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
  |},
|};

export type SetMultipleInStateAction = {|
  ...ReducerAction,
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    alerts: $ReadOnlyArray<m.Alert>,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type AlertsReducerAction =
  | MarkAsReadInStateAction
  | SetMultipleInStateAction;
