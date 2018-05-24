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

// API saga actions
export const API_GET: 'contentItems/API_GET' = 'contentItems/API_GET';
export const API_GET_ALL: 'contentItems/API_GET_ALL' = 'contentItems/API_GET_ALL';
export const API_POST: 'contentItems/API_POST' = 'contentItems/API_POST';
export const API_PUT: 'contentItems/API_PUT' = 'contentItems/API_PUT';
export const API_PATCH: 'contentItems/API_PATCH' = 'contentItems/API_PATCH';
export const API_DELETE: 'contentItems/API_DELETE' = 'contentItems/API_DELETE';

// Task saga actions
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';


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
    // #TODO stub
  },
};

export type SetMultipleInStateAction = {
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    contentItems: Array<ContentItem>,
    // #TODO stub
  },
};

export type ApiGetAction = {
  type: typeof API_GET,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiGetAllAction = {
  type: typeof API_GET_ALL,
  payload: {
    // #TODO stub
  };
};

export type ApiPostAction = {
  type: typeof API_POST,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiPutAction = {
  type: typeof API_PUT,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiPatchAction = {
  type: typeof API_PATCH,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiDeleteAction = {
  type: typeof API_DELETE,
  payload: {
    id: Identifier,
    // #TODO stub
  };
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

export type ApiSagaAction =
  | ApiGetAction
  | ApiGetAllAction
  | ApiPostAction
  | ApiPutAction
  | ApiPatchAction
  | ApiDeleteAction;

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
