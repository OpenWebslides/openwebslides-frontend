// @flow

import type { Identifier } from 'types/model';
import type { ContentItem } from './model';

// Reducer actions
export const ADD_TO_STATE: 'contentItems/ADD_TO_STATE' = 'contentItems/ADD_TO_STATE';
export const EDIT_PLAIN_TEXT_IN_STATE: 'contentItems/EDIT_PLAIN_TEXT_IN_STATE' = 'contentItems/EDIT_PLAIN_TEXT_IN_STATE';
export const EDIT_MEDIA_IN_STATE: 'contentItems/EDIT_MEDIA_IN_STATE' = 'contentItems/EDIT_MEDIA_IN_STATE';
// #TODO add actions for editing subItemIds, etc.
export const REMOVE_FROM_STATE: 'contentItems/REMOVE_FROM_STATE' = 'contentItems/REMOVE_FROM_STATE';
export const SET_IN_STATE: 'contentItems/SET_IN_STATE' = 'contentItems/SET_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'contentItems/SET_MULTIPLE_IN_STATE' = 'contentItems/SET_MULTIPLE_IN_STATE';

// API saga actions
export const API_GET: 'contentItems/API_GET' = 'contentItems/API_GET';
export const API_GET_ALL: 'contentItems/API_GET_ALL' = 'contentItems/API_GET_ALL';
export const API_POST: 'contentItems/API_POST' = 'contentItems/API_POST';
export const API_PUT: 'contentItems/API_PUT' = 'contentItems/API_PUT';
export const API_PATCH: 'contentItems/API_PATCH' = 'contentItems/API_PATCH';
export const API_DELETE: 'contentItems/API_DELETE' = 'contentItems/API_DELETE';

// Task saga actions
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT_PLAIN_TEXT: 'contentItems/EDIT_PLAIN_TEXT' = 'contentItems/EDIT_PLAIN_TEXT';
export const EDIT_MEDIA: 'contentItems/EDIT_MEDIA' = 'contentItems/EDIT_MEDIA';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';


export type AddToStateAction = {
  type: typeof ADD_TO_STATE,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type EditPlainTextInStateAction = {
  type: typeof EDIT_PLAIN_TEXT_IN_STATE,
  payload: {
    id: Identifier,
    text: ?string,
  },
};

export type EditMediaInStateAction = {
  type: typeof EDIT_MEDIA_IN_STATE,
  payload: {
    id: Identifier,
    src: ?string,
    alt: ?string,
    caption: ?string,
  },
};

export type RemoveFromStateAction = {
  type: typeof REMOVE_FROM_STATE,
  payload: {
    id: Identifier,
  },
};

export type SetInStateAction = {
  type: typeof SET_IN_STATE,
  payload: {
    contentItem: ContentItem,
    // #TODO stub
  },
};

export type SetMultipleInStateAction = {
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    contentItems: Array<ContentItem>,
    // #TODO stub
  },
};

export type ApiGetAction = {
  type: typeof API_GET,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiGetAllAction = {
  type: typeof API_GET_ALL,
  payload: {
    // #TODO stub
  };
};

export type ApiPostAction = {
  type: typeof API_POST,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiPutAction = {
  type: typeof API_PUT,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiPatchAction = {
  type: typeof API_PATCH,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type ApiDeleteAction = {
  type: typeof API_DELETE,
  payload: {
    id: Identifier,
    // #TODO stub
  };
};

export type AddAction = {
  type: typeof ADD,
  payload: {
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

export type MoveAction = {
  type: typeof MOVE,
  payload: {
    id: Identifier,
    // #TODO stub
  },
};

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
  };
};

export type ReducerAction =
  | AddToStateAction
  | EditPlainTextInStateAction
  | EditMediaInStateAction
  | RemoveFromStateAction
  | SetInStateAction
  | SetMultipleInStateAction;

export type ApiSagaAction =
  | ApiGetAction
  | ApiGetAllAction
  | ApiPostAction
  | ApiPutAction
  | ApiPatchAction
  | ApiDeleteAction;

export type TaskSagaAction =
  | AddAction
  | EditPlainTextAction
  | EditMediaAction
  | MoveAction
  | RemoveAction;
