// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';
import type { RouterHistory } from 'react-router-dom';

export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';

export const ADD_TO_STATE: 'topics/ADD_TO_STATE' = 'topics/ADD_TO_STATE';
export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';

export const ADD_TO_STATE_ERROR: 'topics/ADD_TO_STATE_ERROR' = 'topics/ADD_TO_STATE_ERROR';
export const REMOVE_FROM_STATE_ERROR: 'topics/REMOVE_FROM_STATE_ERROR' = 'topics/REMOVE_FROM_STATE_ERROR';

export const ADD_ERROR: 'topics/ADD_ERROR' = 'topics/ADD_ERROR';
export const EDIT_ERROR: 'topics/EDIT_ERROR' = 'topics/EDIT_ERROR';
export const REMOVE_ERROR: 'topics/REMOVE_ERROR' = 'topics/REMOVE_ERROR';

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

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
  },
};

// STATE ERROR

export type AddToStateErrorAction = {
  type: typeof ADD_TO_STATE_ERROR,
  error: Error,
};

export type RemoveFromStateErrorAction = {
  type: typeof REMOVE_FROM_STATE_ERROR,
  error: Error,
};


export type TopicReducerAction =
  | EditAction
  | EditErrorAction
  | AddToStateAction
  | RemoveFromStateAction
  | AddToStateErrorAction
  | RemoveFromStateErrorAction;


export type TopicTaskSagaAction =
  | AddAction
  | RemoveAction
  | AddErrorAction
  | RemoveErrorAction;
