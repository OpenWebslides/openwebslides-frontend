// @flow

import contentItemsModule from 'modules/content-items';

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';
import type { RouterHistory } from 'react-router-dom';

import type { Topic } from './model';

const { ContentItem } = contentItemsModule.model;

/* Action constants */

// Reducer actions
export const ADD_TO_STATE: 'topics/ADD_TO_STATE' = 'topics/ADD_TO_STATE';
export const EDIT_IN_STATE: 'topics/EDIT_IN_STATE' = 'topics/EDIT_IN_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';
export const SET_ITEMS_IN_STATE: 'topics/SET_ITEMS_IN_STATE' = 'topics/SET_ITEMS_IN_STATE';

export const ADD_TO_STATE_ERROR: 'topics/ADD_TO_STATE_ERROR' = 'topics/ADD_TO_STATE_ERROR';
export const EDIT_IN_STATE_ERROR: 'topics/EDIT_IN_STATE_ERROR' = 'topics/EDIT_IN_STATE_ERROR';
export const REMOVE_FROM_STATE_ERROR: 'topics/REMOVE_FROM_STATE_ERROR' = 'topics/REMOVE_FROM_STATE_ERROR';
export const SET_ITEMS_IN_STATE_ERROR: 'topics/SET_ITEMS_IN_STATE_ERROR' = 'topics/SET_ITEMS_IN_STATE_ERROR';

// Task saga actions
export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const GET: 'topics/GET' = 'topics/GET';
export const GET_ALL_BY_USERID: 'topics/GET_ALL_BY_USERID' = 'topics/GET_ALL_BY_USERID';
export const SAVE: 'topics/SAVE' = 'topics/SAVE';
export const LOAD: 'topics/LOAD' = 'topics/LOAD';

export const ADD_ERROR: 'topics/ADD_ERROR' = 'topics/ADD_ERROR';
export const EDIT_ERROR: 'topics/EDIT_ERROR' = 'topics/EDIT_ERROR';
export const REMOVE_ERROR: 'topics/REMOVE_ERROR' = 'topics/REMOVE_ERROR';
export const GET_ERROR: 'topics/GET_ERROR' = 'topics/GET_ERROR';
export const GET_ALL_BY_USERID_ERROR: 'topics/GET_ALL_BY_USERID_ERROR' = 'topics/GET_ALL_BY_USERID_ERROR';
export const SAVE_ERROR: 'topics/SAVE_ERROR' = 'topics/SAVE_ERROR';
export const LOAD_ERROR: 'topics/LOAD_ERROR' = 'topics/LOAD_ERROR';

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

export type AddToStateErrorAction = {
  type: typeof ADD_TO_STATE_ERROR,
  error: Error,
};

export type EditInStateErrorAction = {
  type: typeof EDIT_IN_STATE_ERROR,
  error: Error,
};

export type RemoveFromStateErrorAction = {
  type: typeof REMOVE_FROM_STATE_ERROR,
  error: Error,
};

export type SetItemsInStateErrorAction = {
  type: typeof SET_ITEMS_IN_STATE_ERROR,
  error: Error,
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

export type AddErrorAction = {
  type: typeof ADD_ERROR,
  error: Error,
};

export type EditErrorAction = {
  type: typeof EDIT_ERROR,
  error: Error,
};

export type RemoveErrorAction = {
  type: typeof REMOVE_ERROR,
  error: Error,
};

export type GetErrorAction = {
  type: typeof GET_ERROR,
  error: Error,
};

export type GetAllByUserIdErrorAction = {
  type: typeof GET_ALL_BY_USERID_ERROR,
  error: Error,
};

export type SaveContentErrorAction = {
  type: typeof SAVE_ERROR,
  error: Error,
};

export type LoadContentErrorAction = {
  type: typeof LOAD_ERROR,
  error: Error,
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
    contentItems: Array<ContentItem>,
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
  | SetItemsInStateAction
  | AddToStateErrorAction
  | EditInStateErrorAction
  | RemoveFromStateErrorAction
  | SetItemsInStateErrorAction;


export type TopicTaskSagaAction =
  | AddAction
  | EditAction
  | GetAction
  | GetAllByUserIdAction
  | RemoveAction
  | AddErrorAction
  | EditErrorAction
  | GetErrorAction
  | GetAllByUserIdErrorAction
  | RemoveErrorAction;
