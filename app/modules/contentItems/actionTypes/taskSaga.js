// @flow
/* eslint-disable no-multiple-empty-lines */

import type {
  ContentItemType,
  Context,
  VerticalContext,
  AllPropsForAllTypes,
} from '../model';


// Action constants --------------------------------------------------------------------------------

export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const TOGGLE_EDITING: 'contentItems/TOGGLE_EDITING' = 'contentItems/TOGGLE_EDITING';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const INDENT: 'contentItems/INDENT' = 'contentItems/INDENT';
export const REVERSE_INDENT: 'contentItems/REVERSE_INDENT' = 'contentItems/REVERSE_INDENT';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';
export const REMOVE_AND_TOGGLE_PREVIOUS_ITEM: 'contentItems/REMOVE_AND_TOGGLE_PREVIOUS_ITEM' = 'contentItems/REMOVE_AND_TOGGLE_PREVIOUS_ITEM';


// Action types ------------------------------------------------------------------------------------

export type AddAction = {
  type: typeof ADD,
  payload: {
    type: ContentItemType,
    context: ?Context,
    propsForType: $Shape<AllPropsForAllTypes>,
  },
};

export type EditAction = {
  type: typeof EDIT,
  payload: {
    id: string,
    propsForType: $Shape<AllPropsForAllTypes>,
  },
};

export type ToggleEditingAction = {
  type: typeof TOGGLE_EDITING,
  payload: {
    id: string,
    isEditing?: boolean,
  },
};

export type MoveAction = {
  type: typeof MOVE,
  payload: {
    id: string,
    nextContext: VerticalContext,
  },
};

export type IndentAction = {
  type: typeof INDENT,
  payload: {
    id: string,
  },
};

export type ReverseIndentAction = {
  type: typeof REVERSE_INDENT,
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

export type RemoveAndTogglePreviousItemAction = {
  type: typeof REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
  payload: {
    id: string,
  },
};
