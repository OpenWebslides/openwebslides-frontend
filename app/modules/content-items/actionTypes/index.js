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
export const EDIT_IN_STATE: 'contentItems/EDIT_IN_STATE' = 'contentItems/EDIT_IN_STATE';
// #TODO add actions for editing subItemIds, etc.
export const REMOVE_FROM_STATE: 'contentItems/REMOVE_FROM_STATE' = 'contentItems/REMOVE_FROM_STATE';
export const SET_IN_STATE: 'contentItems/SET_IN_STATE' = 'contentItems/SET_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'contentItems/SET_MULTIPLE_IN_STATE' = 'contentItems/SET_MULTIPLE_IN_STATE';

// Task saga actions
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';

// API saga actions

/* Action types */

export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    type: ContentItemType,
    isEditing: boolean,
    context: ?ActionPayloadReducerContext,
    propsForType: ActionPayloadPropsForType,
  },
};

export type EditInStateAction = {
  type: typeof EDIT_IN_STATE,
  payload: {
    id: Identifier,
    type: ContentItemType,
    isEditing: boolean,
    propsForType: ActionPayloadPropsForType,
  },
};

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
  },
};

export type SetInStateAction = {
  type: typeof SET_IN_STATE,
  payload: {
    contentItem: ContentItem,
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
    isEditing: boolean,
    context: ?ActionPayloadSagaContext,
    propsForType: ActionPayloadPropsForType,
  },
};

export type EditAction = {
  type: typeof EDIT,
  payload: {
    id: Identifier,
    isEditing: boolean,
    propsForType: ActionPayloadPropsForType,
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
  | EditInStateAction
  | RemoveFromStateAction
  | SetInStateAction
  | SetMultipleInStateAction;

export type TaskSagaAction =
  | AddAction
  | EditAction
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
