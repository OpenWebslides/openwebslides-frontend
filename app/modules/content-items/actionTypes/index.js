// @flow

import type { Identifier } from 'types/model';
import type { ContentItem, ContentItemType } from '../model';

import type { ActionPayloadPropsForType } from './payload/propsForType';
import {
  actionPayloadReducerContextTypes,
  actionPayloadSagaContextTypes,
} from './payload/context';
import type {
  ActionPayloadReducerContext,
  ActionPayloadReducerContextType,
  ActionPayloadSagaContext,
  ActionPayloadSagaContextType,
} from './payload/context';

// Reducer actions
export const ADD_TO_STATE: 'contentItems/ADD_TO_STATE' = 'contentItems/ADD_TO_STATE';
export const EDIT_PROPS_FOR_TYPE_IN_STATE: 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE' = 'contentItems/EDIT_PROPS_FOR_TYPE_IN_STATE';
export const SWITCH_EDITING_IN_STATE: 'contentItems/SWITCH_EDITING_IN_STATE' = 'contentItems/SWITCH_EDITING_IN_STATE';
export const REMOVE_FROM_STATE: 'contentItems/REMOVE_FROM_STATE' = 'contentItems/REMOVE_FROM_STATE';
export const SET_IN_STATE: 'contentItems/SET_IN_STATE' = 'contentItems/SET_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'contentItems/SET_MULTIPLE_IN_STATE' = 'contentItems/SET_MULTIPLE_IN_STATE';

// Task saga actions
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const TOGGLE_EDITING: 'contentItems/TOGGLE_EDITING' = 'contentItems/TOGGLE_EDITING';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';

// API saga actions

/* Action types */

export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    type: ContentItemType,
    context: ?ActionPayloadReducerContext,
    propsForType: ActionPayloadPropsForType,
  },
};

export type EditPropsForTypeInStateAction = {
  type: typeof EDIT_PROPS_FOR_TYPE_IN_STATE,
  payload: {
    contentItem: ContentItem,
    propsForType: ActionPayloadPropsForType,
  },
};

export type SwitchEditingInStateAction = {
  type: typeof SWITCH_EDITING_IN_STATE,
  payload: {
    previousEditingItemId: ?Identifier,
    nextEditingItemId: ?Identifier,
  },
};

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
    context: ?ActionPayloadReducerContext,
  },
};

export type SetMultipleInStateAction = {
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    contentItems: Array<ContentItem>,
  },
};

export type AddAction = {
  type: typeof ADD,
  payload: {
    type: ContentItemType,
    context: ?ActionPayloadSagaContext,
    propsForType: ActionPayloadPropsForType,
  },
};

export type EditAction = {
  type: typeof EDIT,
  payload: {
    id: Identifier,
    propsForType: ActionPayloadPropsForType,
  },
};

export type ToggleEditingAction = {
  type: typeof TOGGLE_EDITING,
  payload: {
    id: Identifier,
    isEditing?: boolean,
  },
};

export type MoveAction = {
  type: typeof MOVE,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
  };
};

export type ReducerAction =
  | AddToStateAction
  | EditPropsForTypeInStateAction
  | SwitchEditingInStateAction
  | RemoveFromStateAction
  | SetMultipleInStateAction;

export type TaskSagaAction =
  | AddAction
  | EditAction
  | ToggleEditingAction
  | MoveAction
  | RemoveAction;

export {
  actionPayloadReducerContextTypes,
  actionPayloadSagaContextTypes,
};
export type {
  ActionPayloadPropsForType,
  ActionPayloadReducerContext,
  ActionPayloadReducerContextType,
  ActionPayloadSagaContext,
  ActionPayloadSagaContextType,
};
