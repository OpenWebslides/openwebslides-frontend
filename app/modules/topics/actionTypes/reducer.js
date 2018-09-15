// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const EDIT_IN_STATE: 'topics/EDIT_IN_STATE' = 'topics/EDIT_IN_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';
export const SET_MULTIPLE_IN_STATE: 'topics/SET_MULTIPLE_IN_STATE' = 'topics/SET_MULTIPLE_IN_STATE';
export const TOGGLE_CONTENT_FETCHED: 'topics/TOGGLE_CONTENT_FETCHED' = 'topics/TOGGLE_CONTENT_FETCHED';


// Action types ------------------------------------------------------------------------------------

export type EditInStateAction = {|
  type: typeof EDIT_IN_STATE,
  payload: {
    id: string,
    editedProps: {|
      title?: string,
      description?: ?string,
    |},
  },
|};

export type RemoveFromStateAction = {|
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: string,
  },
|};

export type SetMultipleInStateAction = {|
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    topics: $ReadOnlyArray<m.Topic>,
  },
|};

export type ToggleContentFetchedAction = {|
  type: typeof TOGGLE_CONTENT_FETCHED,
  payload: {
    id: string,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type TopicsReducerAction =
  | EditInStateAction
  | RemoveFromStateAction
  | SetMultipleInStateAction
  | ToggleContentFetchedAction;
