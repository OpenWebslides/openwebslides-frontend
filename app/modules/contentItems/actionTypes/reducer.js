// @flow
/* eslint-disable no-multiple-empty-lines */

import type {
  ContentItem,
  ContentItemType,
  VerticalContext,
  AllPropsForAllTypes,
} from '../model';


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
    type: ContentItemType,
    context: ?VerticalContext,
    propsForType: $Shape<AllPropsForAllTypes>,
  },
|};

export type EditPropsForTypeInStateAction = {|
  type: typeof EDIT_PROPS_FOR_TYPE_IN_STATE,
  payload: {
    contentItem: ContentItem,
    propsForType: $Shape<AllPropsForAllTypes>,
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
    nextContext: VerticalContext,
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
    contentItems: Array<ContentItem>,
  },
|};

export type ReducerAction =
  | AddToStateAction
  | EditPropsForTypeInStateAction
  | SwitchEditingInStateAction
  | MoveInStateAction
  | RemoveFromStateAction
  | SetMultipleInStateAction;
