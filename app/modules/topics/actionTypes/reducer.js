// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const EDIT_IN_STATE: 'topics/EDIT_IN_STATE' = 'topics/EDIT_IN_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';
export const SET_DIRTY_IN_STATE: 'topics/SET_DIRTY_IN_STATE' = 'topics/SET_DIRTY_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'topics/SET_MULTIPLE_IN_STATE' = 'topics/SET_MULTIPLE_IN_STATE';
export const TOGGLE_CONTENT_FETCHED_IN_STATE: 'topics/TOGGLE_CONTENT_FETCHED_IN_STATE' = 'topics/TOGGLE_CONTENT_FETCHED_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type EditInStateAction = {|
  ...ReducerAction,
  type: typeof EDIT_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
    editedProps: {|
      title?: string,
      description?: ?string,
    |},
  |},
|};

export type RemoveFromStateAction = {|
  ...ReducerAction,
  type: typeof REMOVE_FROM_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
  |},
|};

export type SetDirtyInStateAction = {|
  ...ReducerAction,
  type: typeof SET_DIRTY_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
    dirty: boolean,
  |},
|};

export type SetMultipleInStateAction = {|
  ...ReducerAction,
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    topics: $ReadOnlyArray<m.Topic>,
  |},
|};

export type ToggleContentFetchedInStateAction = {|
  ...ReducerAction,
  type: typeof TOGGLE_CONTENT_FETCHED_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
  |},
|};


// Reducer action ----------------------------------------------------------------------------------

export type TopicsReducerAction =
  | EditInStateAction
  | RemoveFromStateAction
  | SetDirtyInStateAction
  | SetMultipleInStateAction
  | ToggleContentFetchedInStateAction;
