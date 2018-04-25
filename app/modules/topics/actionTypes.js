// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';
import type { RouterHistory } from 'react-router-dom';

import type { Topic } from './model';

export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const FETCH: 'topics/FETCH' = 'topics/FETCH';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';

export const ADD_ERROR: 'topics/ADD_ERROR' = 'topics/ADD_ERROR';
export const EDIT_ERROR: 'topics/EDIT_ERROR' = 'topics/EDIT_ERROR';
export const FETCH_ERROR: 'topics/FETCH_ERROR' = 'topics/FETCH_ERROR';
export const REMOVE_ERROR: 'topics/REMOVE_ERROR' = 'topics/REMOVE_ERROR';

export const ADD_TO_STATE: 'topics/ADD_TO_STATE' = 'topics/ADD_TO_STATE';
export const EDIT_IN_STATE: 'topics/EDIT_IN_STATE' = 'topics/EDIT_IN_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';
export const SET_TOPICS_IN_STATE: 'topics/SET_TOPICS_IN_STATE' = 'topics/SET_TOPICS_IN_STATE';

export const ADD_TO_STATE_ERROR: 'topics/ADD_TO_STATE_ERROR' = 'topics/ADD_TO_STATE_ERROR';
export const EDIT_IN_STATE_ERROR: 'topics/EDIT_IN_STATE_ERROR' = 'topics/EDIT_IN_STATE_ERROR';
export const REMOVE_FROM_STATE_ERROR: 'topics/REMOVE_FROM_STATE_ERROR' = 'topics/REMOVE_FROM_STATE_ERROR';
export const SET_TOPICS_IN_STATE_ERROR: 'topics/SET_TOPICS_IN_STATE_ERROR' = 'topics/SET_TOPICS_IN_STATE_ERROR';

export const API_GET_TOPICS: 'topics/API_GET_TOPICS' = 'topics/API_GET_TOPICS';
export const API_POST_TOPIC: 'topics/API_POST_TOPIC' = 'topics/API_POST_TOPIC';

// TASK SAGAS

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

export type FetchAction = {
  type: typeof FETCH,
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
    modalType: string,
  },
};

// TASK SAGA ERRORS

export type AddErrorAction = {
  type: typeof ADD_ERROR,
  error: Error,
};

export type EditErrorAction = {
  type: typeof EDIT_ERROR,
  error: Error,
};

export type FetchErrorAction = {
  type: typeof FETCH_ERROR,
  error: Error,
};

export type RemoveErrorAction = {
  type: typeof REMOVE_ERROR,
  error: Error,
};

// STATE

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

export type SetTopicsInStateAction = {
  type: typeof SET_TOPICS_IN_STATE,
  payload: {
    items: ?Array<Topic>,
  },
};

// STATE ERROR

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

export type SetTopicsInStateErrorAction = {
  type: typeof SET_TOPICS_IN_STATE_ERROR,
  error: Error,
};

export type ApiGetTopicsAction = {
  type: typeof API_GET_TOPICS,
};

export type ApiPostTopicAction = {
  type: typeof API_POST_TOPIC,
  payload: {
    userId: Identifier,
    title: string,
    description: ?string,
  },
};

export type TopicReducerAction =
  | AddToStateAction
  | EditInStateAction
  | RemoveFromStateAction
  | SetTopicsInStateAction
  | AddToStateErrorAction
  | EditInStateErrorAction
  | RemoveFromStateErrorAction
  | SetTopicsInStateErrorAction;


export type TopicTaskSagaAction =
  | AddAction
  | EditAction
  | FetchAction
  | RemoveAction
  | AddErrorAction
  | EditErrorAction
  | FetchErrorAction
  | RemoveErrorAction;
