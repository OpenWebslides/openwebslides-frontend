// @flow

import type { Identifier } from 'types/model';

export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT_PLAIN_TEXT: 'contentItems/EDIT_PLAIN_TEXT' = 'contentItems/EDIT_PLAIN_TEXT';
export const EDIT_MEDIA: 'contentItems/EDIT_MEDIA' = 'contentItems/EDIT_MEDIA';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';

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

// #TODO add actions for editing subItemIds, etc.

export type RemoveAction = {
  type: typeof REMOVE,
  payload: {
    id: Identifier,
  },
};

export type ContentItemAction =
  | AddAction
  | EditPlainTextAction
  | EditMediaAction
  | RemoveAction;
