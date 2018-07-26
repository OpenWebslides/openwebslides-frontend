// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD_TO_STATE: 'contentItems/ADD_TO_STATE' = 'contentItems/ADD_TO_STATE';
export const EDIT_PROPS_FOR_TYPE_IN_STATE: 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE' = 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE';
export const SWITCH_EDITING_IN_STATE: 'contentItems/SWITCH_EDITING_IN_STATE' = 'contentItems/SWITCH_EDITING_IN_STATE';
export const MOVE_IN_STATE: 'contentItems/MOVE_IN_STATE' = 'contentItems/MOVE_IN_STATE';
export const REMOVE_FROM_STATE: 'contentItems/REMOVE_FROM_STATE' = 'contentItems/REMOVE_FROM_STATE';
export const SET_MULTIPLE_IN_STATE: 'contentItems/SET_MULTIPLE_IN_STATE' = 'contentItems/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type AddToStateAction = {|
  type: typeof ADD_TO_STATE,
  payload: {
    id: string,
    type: m.ContentItemType,
    context: ?m.VerticalContext,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  },
|};

export type EditPropsForTypeInStateAction = {|
  type: typeof EDIT_PROPS_FOR_TYPE_IN_STATE,
  payload: {
    contentItem: m.ContentItem,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  },
|};

export type SwitchEditingInStateAction = {|
  type: typeof SWITCH_EDITING_IN_STATE,
  payload: {
    previousEditingItemId: ?string,
    nextEditingItemId: ?string,
  },
|};

export type MoveInStateAction = {|
  type: typeof MOVE_IN_STATE,
  payload: {
    id: string,
    nextContext: m.VerticalContext,
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
    contentItems: $ReadOnlyArray<m.ContentItem>,
  },
|};

export type ReducerAction =
  | AddToStateAction
  | EditPropsForTypeInStateAction
  | SwitchEditingInStateAction
  | MoveInStateAction
  | RemoveFromStateAction
  | SetMultipleInStateAction;
