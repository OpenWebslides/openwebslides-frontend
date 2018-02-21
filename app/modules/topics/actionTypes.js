// @flow

import type { Error } from 'types/error';

export const ADD = 'topics/ADD';
export const EDIT = 'topics/EDIT';
export const REMOVE = 'topics/REMOVE';

export const ADD_ERROR = 'topics/ADD_ERROR';
export const EDIT_ERROR = 'topics/EDIT_ERROR';
export const REMOVE_ERROR = 'topics/REMOVE_ERROR';

export type AddAction = {
  type: 'topics/ADD',
  payload: {
    id: string,
    title: string,
    description: string,
  },
};

export type EditAction = {
  type: 'topics/EDIT',
  payload: {
    id: string,
    title: ?string,
    description: ?string,
  },
};

export type RemoveAction = {
  type: 'topics/REMOVE',
  payload: {
    id: string,
  },
};

export type AddErrorAction = {
  type: 'topics/ADD_ERROR',
  error: Error,
};

export type EditErrorAction = {
  type: 'topics/EDIT_ERROR',
  error: Error,
};

export type RemoveErrorAction = {
  type: 'topics/REMOVE_ERROR',
  error: Error,
};

export type TopicAction =
  | AddAction
  | EditAction
  | RemoveAction
  | AddErrorAction
  | EditErrorAction
  | RemoveErrorAction;
