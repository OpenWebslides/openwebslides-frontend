// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const ADD: 'topics/ADD' = 'topics/ADD';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const GET: 'topics/GET' = 'topics/GET';
export const GET_ALL_BY_USERID: 'topics/GET_ALL_BY_USERID' = 'topics/GET_ALL_BY_USERID';
export const SAVE: 'topics/SAVE' = 'topics/SAVE';
export const LOAD: 'topics/LOAD' = 'topics/LOAD';


// Action types ------------------------------------------------------------------------------------

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
    editedProps: {|
      title?: string,
      description?: ?string,
    |},
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


// TaskSaga action ---------------------------------------------------------------------------------

export type TaskSagaAction =
  | AddAction
  | EditAction
  | RemoveAction
  | GetAction
  | GetAllByUserIdAction
  | SaveContentAction
  | LoadContentAction;
