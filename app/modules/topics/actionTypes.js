// @flow

/* eslint-disable flowtype/require-types-at-top */

import * as m from './model';

/* Action constants */

// Reducer actions
export const ADD_TO_STATE: 'topics/ADD_TO_STATE' = 'topics/ADD_TO_STATE';
export const EDIT_IN_STATE: 'topics/EDIT_IN_STATE' = 'topics/EDIT_IN_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';
export const SET_ITEMS_IN_STATE: 'topics/SET_ITEMS_IN_STATE' = 'topics/SET_ITEMS_IN_STATE';

// Task saga actions
export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const GET: 'topics/GET' = 'topics/GET';
export const GET_ALL_BY_USERID: 'topics/GET_ALL_BY_USERID' = 'topics/GET_ALL_BY_USERID';
export const SAVE: 'topics/SAVE' = 'topics/SAVE';
export const LOAD: 'topics/LOAD' = 'topics/LOAD';

// API saga actions
export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';
export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_GET_ALL_BY_USERID: 'topics/API_GET_ALL_BY_USERID' = 'topics/API_GET_ALL_BY_USERID';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';
export const API_PATCH_CONTENT: 'topics/API_PATCH_CONTENT' = 'topics/API_PATCH_CONTENT';
export const API_GET_CONTENT: 'topics/API_GET_CONTENT' = 'topics/API_GET_CONTENT';

/* Action types */

// Reducer actions
export type AddToStateAction = {|
  type: typeof ADD_TO_STATE,
  payload: {
    id: string,
    userId: string,
    title: string,
    description: string,
    rootContentItemId: string,
  },
|};

export type EditInStateAction = {|
  type: typeof EDIT_IN_STATE,
  payload: {
    id: string,
    title: ?string,
    description: ?string,
  },
|};

export type RemoveFromStateAction = {|
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: string,
  },
|};

export type SetItemsInStateAction = {|
  type: typeof SET_ITEMS_IN_STATE,
  payload: {
    items: ?$ReadOnlyArray<m.Topic>,
  },
|};

// Task saga actions
export type AddAction = {|
  type: typeof ADD,
  payload: {
    id: string,
    userId: string,
    title: string,
    description: string,
    rootContentItemId: string,
  },
|};

export type EditAction = {|
  type: typeof EDIT,
  payload: {
    id: string,
    title: ?string,
    description: ?string,
  },
|};

export type RemoveAction = {|
  type: typeof REMOVE,
  payload: {
    id: string,
  },
|};

export type GetAction = {|
  type: typeof GET,
  payload: {
    id: string,
  },
|};

export type GetAllByUserIdAction = {|
  type: typeof GET_ALL_BY_USERID,
  payload: {
    userId: string,
  },
|};

export type SaveContentAction = {|
  type: typeof SAVE,
  payload: {
    id: string,
  },
|};

export type LoadContentAction = {|
  type: typeof LOAD,
  payload: {
    id: string,
  },
|};

// API saga actions
export type ApiDeleteTopicAction = {|
  type: typeof API_DELETE,
  payload: {
    id: string,
  },
|};

export type ApiGetTopicAction = {|
  type: typeof API_GET,
  payload: {
    id: string,
  },
|};

export type ApiGetAllTopicsByUserIdAction = {|
  type: typeof API_GET_ALL_BY_USERID,
  payload: {
    userId: string,
  },
|};

export type ApiPostTopicAction = {|
  type: typeof API_POST,
  payload: {
    userId: string,
    title: string,
    description: ?string,
  },
|};

export type ApiPatchTopicContentAction = {|
  type: typeof API_PATCH_CONTENT,
  payload: {
    id: string,
    // dependency on contentItems caused dependency cycle; move patch action to contentItems #TODO
    // content: $ReadOnlyArray<contentItems.model.ContentItem>,
    // eslint-disable-next-line flowtype/no-weak-types
    content: $ReadOnlyArray<any>,
  },
|};

export type ApiGetTopicContentAction = {|
  type: typeof API_GET_CONTENT,
  payload: {
    id: string,
  },
|};

export type ReducerAction =
  | AddToStateAction
  | EditInStateAction
  | RemoveFromStateAction
  | SetItemsInStateAction;

export type ApiSagaAction =
  | ApiDeleteTopicAction
  | ApiGetTopicAction
  | ApiGetAllTopicsByUserIdAction
  | ApiPostTopicAction
  | ApiPatchTopicContentAction
  | ApiGetTopicContentAction;

export type TaskSagaAction =
  | AddAction
  | EditAction
  | RemoveAction
  | GetAction
  | GetAllByUserIdAction
  | SaveContentAction
  | LoadContentAction;

export type ModuleAction = ReducerAction | ApiSagaAction | TaskSagaAction;
