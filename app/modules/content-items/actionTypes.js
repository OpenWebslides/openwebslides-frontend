// @flow

import type { Error } from 'types/error';
import type { Identifier } from 'types/model';

export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';

export const ADD_ERROR: 'contentItems/ADD_ERROR' = 'contentItems/ADD_ERROR';
export const EDIT_ERROR: 'contentItems/EDIT_ERROR' = 'contentItems/EDIT_ERROR';
export const REMOVE_ERROR: 'contentItems/REMOVE_ERROR' = 'contentItems/REMOVE_ERROR';

export type AddAction = {
  type: typeof ADD,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type EditAction = {
  type: typeof EDIT,
  payload: {
    id: Identifier,
    // #TODO stub
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

export type ContentItemAction =
  | AddAction
  | EditAction
  | RemoveAction
  | AddErrorAction
  | EditErrorAction
  | RemoveErrorAction;
