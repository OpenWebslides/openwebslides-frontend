// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const CREATE: 'topics/CREATE' = 'topics/CREATE';
export const EDIT: 'topics/EDIT' = 'topics/EDIT';
export const REMOVE: 'topics/REMOVE' = 'topics/REMOVE';
export const FETCH: 'topics/FETCH' = 'topics/FETCH';
export const FETCH_WITH_CONTENT: 'topics/FETCH_WITH_CONTENT' = 'topics/FETCH_WITH_CONTENT';
export const PATCH_WITH_CONTENT: 'topics/PATCH_WITH_CONTENT' = 'topics/PATCH_WITH_CONTENT';


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

export type FetchAction = {|
  type: typeof FETCH,
  payload: {
    id: string,
  },
|};

export type FetchWithContentAction = {|
  type: typeof FETCH_WITH_CONTENT,
  payload: {
    id: string,
  },
|};

export type PatchWithContentAction = {|
  type: typeof PATCH_WITH_CONTENT,
  payload: {
    id: string,
  },
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type TaskSagaAction =
  | CreateAction
  | EditAction
  | RemoveAction
  | FetchAction
  | FetchWithContentAction
  | PatchWithContentAction;
