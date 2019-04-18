// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type ReducerAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD_TO_STATE: 'contentItems/ADD_TO_STATE' = 'contentItems/ADD_TO_STATE';
export const EDIT_PROPS_FOR_TYPE_IN_STATE: 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE' = 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE';
export const SWITCH_EDITING_IN_STATE: 'contentItems/SWITCH_EDITING_IN_STATE' = 'contentItems/SWITCH_EDITING_IN_STATE';
export const MOVE_IN_STATE: 'contentItems/MOVE_IN_STATE' = 'contentItems/MOVE_IN_STATE';
export const CONVERT_IN_STATE: 'contentItems/CONVERT_IN_STATE' = 'contentItems/CONVERT_IN_STATE';
export const REMOVE_FROM_STATE: 'contentItems/REMOVE_FROM_STATE' = 'contentItems/REMOVE_FROM_STATE';
export const SET_MULTIPLE_IN_STATE: 'contentItems/SET_MULTIPLE_IN_STATE' = 'contentItems/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type AddToStateAction = {|
  ...ReducerAction,
  type: typeof ADD_TO_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
    type: m.ContentItemType,
    context: ?m.SuperContext,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  |},
|};

export type EditPropsForTypeInStateAction = {|
  ...ReducerAction,
  type: typeof EDIT_PROPS_FOR_TYPE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    contentItem: m.ContentItem,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  |},
|};

export type SwitchEditingInStateAction = {|
  ...ReducerAction,
  type: typeof SWITCH_EDITING_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    previousEditingItemId: ?string,
    nextEditingItemId: ?string,
  |},
|};

export type MoveInStateAction = {|
  ...ReducerAction,
  type: typeof MOVE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
    nextContext: m.SuperContext,
  |},
|};

export type ConvertInStateAction = {|
  ...ReducerAction,
  type: typeof CONVERT_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    id: string,
    newType: m.ContentItemType,
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

export type SetMultipleInStateAction = {|
  ...ReducerAction,
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {|
    ...$PropertyType<ReducerAction, 'payload'>,
    contentItems: $ReadOnlyArray<m.ContentItem>,
  |},
|};

export type ContentItemsReducerAction =
  | AddToStateAction
  | EditPropsForTypeInStateAction
  | SwitchEditingInStateAction
  | MoveInStateAction
  | ConvertInStateAction
  | RemoveFromStateAction
  | SetMultipleInStateAction;
