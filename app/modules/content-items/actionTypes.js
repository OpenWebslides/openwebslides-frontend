// @flow

import type { Identifier } from 'types/model';
import type { ContentItem } from './model';

// Reducer actions
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT_PLAIN_TEXT: 'contentItems/EDIT_PLAIN_TEXT' = 'contentItems/EDIT_PLAIN_TEXT';
export const EDIT_MEDIA: 'contentItems/EDIT_MEDIA' = 'contentItems/EDIT_MEDIA';
// #TODO add actions for editing subItemIds, etc.
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';
export const SET: 'contentItems/SET' = 'contentItems/SET';

// Task saga actions
export const CREATE: 'contentItems/CREATE' = 'contentItems/CREATE';
export const UPDATE_PLAIN_TEXT: 'contentItems/UPDATE_PLAIN_TEXT' = 'contentItems/UPDATE_PLAIN_TEXT';
export const UPDATE_MEDIA: 'contentItems/UPDATE_MEDIA' = 'contentItems/UPDATE_MEDIA';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const DESTROY: 'contentItems/DESTROY' = 'contentItems/DESTROY';

// API saga actions
export const POST: 'contentItems/POST' = 'contentItems/POST';
export const PUT: 'contentItems/PUT' = 'contentItems/PUT';
export const DELETE: 'contentItems/DELETE' = 'contentItems/DELETE';
export const GET: 'contentItems/GET' = 'contentItems/GET';


export type AddAction = {
  type: typeof ADD,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type EditPlainTextAction = {
  type: typeof EDIT_PLAIN_TEXT,
  payload: {
    id: Identifier,
    text: ?string,
  },
};

export type EditMediaAction = {
  type: typeof EDIT_MEDIA,
  payload: {
    id: Identifier,
    src: ?string,
    alt: ?string,
    caption: ?string,
  },
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
  },
};

export type SetAction = {
  type: typeof SET,
  payload: {
    contentItems: Array<ContentItem>,
    // #TODO stub
  },
};

export type CreateAction = {
  type: typeof CREATE,
  payload: {
    // #TODO stub
  },
};

export type UpdatePlainTextAction = {
  type: typeof UPDATE_PLAIN_TEXT,
  payload: {
    id: Identifier,
    text: ?string,
  },
};

export type UpdateMediaAction = {
  type: typeof UPDATE_MEDIA,
  payload: {
    id: Identifier,
    src: ?string,
    alt: ?string,
    caption: ?string,
  },
};

export type MoveAction = {
  type: typeof MOVE,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type DestroyAction = {
  type: typeof DESTROY,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type PostAction = {
  type: typeof POST,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type PutAction = {
  type: typeof POST,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type DeleteAction = {
  type: typeof POST,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type GetAction = {
  type: typeof POST,
  payload: {
    ids: Array<Identifier>,
    // #TODO stub
  };
};

export type ContentItemReducerAction =
  | AddAction
  | EditPlainTextAction
  | EditMediaAction
  | RemoveAction
  | SetAction;

export type ContentItemTaskSagaAction =
  | CreateAction
  | UpdatePlainTextAction
  | UpdateMediaAction
  | MoveAction
  | DestroyAction;

export type ContentItemApiSagaAction =
  | PostAction
  | PutAction
  | DeleteAction
  | GetAction;
