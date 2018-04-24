// @flow

import _ from 'lodash';

import type { Identifier } from 'types/model';

import * as t from './actionTypes';
import { generateId } from './model';

export const add = (
  userId: Identifier,
  title: string,
  description: ?string = null,
): t.AddAction | t.AddErrorAction => {
  const newId = generateId();
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    return {
      type: t.ADD_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  return {
    type: t.ADD,
    payload: {
      id: newId,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId: 'w4lg2u0p1h', // #TODO stub
    },
  };
};

export const edit = (
  id: Identifier,
  title: ?string = null,
  description: ?string = null,
): t.EditAction | t.EditErrorAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    return {
      type: t.EDIT_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  if (newTitle === null && newDescription === null) {
    return {
      type: t.EDIT_ERROR,
      error: {
        message: 'Action must contain at least one edit.',
      },
    };
  }

  return {
    type: t.EDIT,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export const remove = (
  id: Identifier,
): t.RemoveAction | t.RemoveErrorAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

export const removeFromState = (
  id: Identifier,
): t.RemoveFromStateAction | t.RemoveFromStateErrorAction => {
  return {
    type: t.REMOVE_FROM_STATE,
    payload: {
      id,
    },
  };
};
