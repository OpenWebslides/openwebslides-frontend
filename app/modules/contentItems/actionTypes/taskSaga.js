// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import { type TaskSagaAction } from 'types/actions';

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const GENERATE_ROOT: 'contentItems/GENERATE_ROOT' = 'contentItems/GENERATE_ROOT';
export const GENERATE_PLACEHOLDER: 'contentItems/GENERATE_PLACEHOLDER' = 'contentItems/GENERATE_PLACEHOLDER';
export const ADD: 'contentItems/ADD' = 'contentItems/ADD';
export const EDIT: 'contentItems/EDIT' = 'contentItems/EDIT';
export const TOGGLE_EDITING: 'contentItems/TOGGLE_EDITING' = 'contentItems/TOGGLE_EDITING';
export const MOVE: 'contentItems/MOVE' = 'contentItems/MOVE';
export const INDENT: 'contentItems/INDENT' = 'contentItems/INDENT';
export const REVERSE_INDENT: 'contentItems/REVERSE_INDENT' = 'contentItems/REVERSE_INDENT';
export const REMOVE: 'contentItems/REMOVE' = 'contentItems/REMOVE';
export const REMOVE_AND_TOGGLE_PREVIOUS_ITEM: 'contentItems/REMOVE_AND_TOGGLE_PREVIOUS_ITEM' = 'contentItems/REMOVE_AND_TOGGLE_PREVIOUS_ITEM';


// Action types ------------------------------------------------------------------------------------

export type GenerateRootAction = {|
  ...TaskSagaAction,
  type: typeof GENERATE_ROOT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
  |},
|};

export type GeneratePlaceholderAction = {|
  ...TaskSagaAction,
  type: typeof GENERATE_PLACEHOLDER,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    rootContentItemId: string,
  |},
|};

export type AddAction = {|
  ...TaskSagaAction,
  type: typeof ADD,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    type: m.ContentItemType,
    context: ?m.ContentItemContext,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  |},
|};

export type EditAction = {|
  ...TaskSagaAction,
  type: typeof EDIT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    propsForType: $Shape<m.AllPropsForAllTypes>,
  |},
|};

export type ToggleEditingAction = {|
  ...TaskSagaAction,
  type: typeof TOGGLE_EDITING,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    isEditing?: boolean,
  |},
|};

export type MoveAction = {|
  ...TaskSagaAction,
  type: typeof MOVE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
    nextContext: m.VerticalContext,
  |},
|};

export type IndentAction = {|
  ...TaskSagaAction,
  type: typeof INDENT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type ReverseIndentAction = {|
  ...TaskSagaAction,
  type: typeof REVERSE_INDENT,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type RemoveAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};

export type RemoveAndTogglePreviousItemAction = {|
  ...TaskSagaAction,
  type: typeof REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
  payload: {|
    ...$PropertyType<TaskSagaAction, 'payload'>,
    id: string,
  |},
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type ContentItemsTaskSagaAction =
  | GenerateRootAction
  | GeneratePlaceholderAction
  | AddAction
  | EditAction
  | ToggleEditingAction
  | MoveAction
  | IndentAction
  | ReverseIndentAction
  | RemoveAction
  | RemoveAndTogglePreviousItemAction;
