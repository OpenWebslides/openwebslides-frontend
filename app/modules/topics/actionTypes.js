// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';

export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';

export const REMOVE_FROM_STATE: 'topics/REMOVE_FROM_STATE' = 'topics/REMOVE_FROM_STATE';

export const ADD_ERROR: 'topics/ADD_ERROR' = 'topics/ADD_ERROR';
export const EDIT_ERROR: 'topics/EDIT_ERROR' = 'topics/EDIT_ERROR';
export const REMOVE_ERROR: 'topics/REMOVE_ERROR' = 'topics/REMOVE_ERROR';

export type AddAction = {
  type: typeof ADD,
  payload: {
    id: Identifier,
    userId: Identifier,
    title: string,
    description: string,
    rootContentItemId: Identifier,
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

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
  },
};

export type RemoveFromStateErrorAction = {
  type: typeof REMOVE_FROM_STATE_ERROR,
  error: Error,
};

export type TopicReducerAction =
  | RemoveFromStateErrorAction;


export type TopicTaskSagaAction =
  | AddAction
  | EditAction
  | RemoveAction
  | AddErrorAction
  | EditErrorAction
  | RemoveErrorAction;
