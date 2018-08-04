// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const CREATE: 'topics/CREATE' = 'topics/CREATE';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const GET: 'topics/GET' = 'topics/GET';
export const SAVE: 'topics/SAVE' = 'topics/SAVE';
export const LOAD: 'topics/LOAD' = 'topics/LOAD';


// Action types ------------------------------------------------------------------------------------

export type CreateAction = {|
  type: typeof CREATE,
  payload: {
    title: string,
    description: ?string,
    userId: string,
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
  | CreateAction
  | EditAction
  | RemoveAction
  | GetAction
  | SaveContentAction
  | LoadContentAction;
