// @flow

export const ADD: 'sidebar/ADD' = 'sidebar/ADD';
export const REMOVE: 'sidebar/REMOVE' = 'sidebar/REMOVE';

export const ADD_ERROR: 'sidebar/ADD_ERROR' = 'sidebar/ADD_ERROR';
export const REMOVE_ERROR: 'sidebar/REMOVE_ERROR' = 'sidebar/REMOVE_ERROR';

export type AddAction = {
  type: typeof ADD,
  payload: {
    id: string,
  },
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: string,
  },
};

export type AddErrorAction = {
  type: typeof ADD_ERROR,
  error: Error,
};

export type RemoveErrorAction = {
  type: typeof REMOVE_ERROR,
  error: Error,
};

export type SidebarAction =
  | AddAction
  | RemoveAction
  | AddErrorAction
  | RemoveErrorAction;
