// @flow

import contentItems from 'modules/content-items';

import type { Identifier } from 'types/model';
import type { RouterHistory } from 'react-router-dom';

import type { Topic } from './model';

const { ContentItem } = contentItems.model;

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
export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    userId: Identifier,
    title: string,
    description: string,
    rootContentItemId: Identifier,
  },
};

export type EditInStateAction = {
  type: typeof EDIT_IN_STATE,
  payload: {
    id: Identifier,
    title: ?string,
    description: ?string,
  },
};

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
  },
};

export type SetItemsInStateAction = {
  type: typeof SET_ITEMS_IN_STATE,
  payload: {
    items: ?Array<Topic>,
  },
};

// Task saga actions
export type AddAction = {
  type: typeof ADD,
  payload: {
    id: Identifier,
    userId: Identifier,
    title: string,
    description: string,
    rootContentItemId: Identifier,
    history: RouterHistory,
  },
};

export type EditAction = {
  type: typeof EDIT,
  payload: {
    id: Identifier,
    title: ?string,
    description: ?string,
  },
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
  },
};

export type GetAction = {
  type: typeof GET,
  payload: {
    id: Identifier,
  },
};

export type GetAllByUserIdAction = {
  type: typeof GET_ALL_BY_USERID,
  payload: {
    userId: Identifier,
  },
};

export type SaveContentAction = {
  type: typeof SAVE,
  payload: {
    id: Identifier,
  },
};

export type LoadContentAction = {
  type: typeof LOAD,
  payload: {
    id: Identifier,
  },
};

// API saga actions
export type ApiDeleteTopicAction = {
  type: typeof API_DELETE,
  payload: {
    id: Identifier,
  },
};

export type ApiGetTopicAction = {
  type: typeof API_GET,
  payload: {
    id: Identifier,
  },
};

export type ApiGetAllTopicsByUserIdAction = {
  type: typeof API_GET_ALL_BY_USERID,
  payload: {
    userId: Identifier,
  },
};

export type ApiPostTopicAction = {
  type: typeof API_POST,
  payload: {
    userId: Identifier,
    title: string,
    description: ?string,
  },
};

export type ApiPatchTopicContentAction = {
  type: typeof API_PATCH_CONTENT,
  payload: {
    id: Identifier,
    content: Array<ContentItem>,
  },
};

export type ApiGetTopicContentAction = {
  type: typeof API_GET_CONTENT,
  payload: {
    id: Identifier,
  },
};

export type TopicReducerAction =
  | AddToStateAction
  | EditInStateAction
  | RemoveFromStateAction
  | SetItemsInStateAction;


export type TopicTaskSagaAction =
  | AddAction
  | EditAction
  | GetAction
  | GetAllByUserIdAction
  | RemoveAction;
