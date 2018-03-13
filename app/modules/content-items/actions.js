// @flow

import type { Identifier } from 'types/model';

import * as t from './actionTypes';
import { generateId } from './model';

export const add = (

): t.AddAction | t.AddErrorAction => {
  const newId = generateId();

  // #TODO stub

  return {
    type: t.ADD,
    payload: {
      id: newId,
    },
  };
};

export const edit = (
  id: Identifier,
): t.EditAction | t.EditErrorAction => {
  // #TODO stub

  return {
    type: t.EDIT,
    payload: {
      id,
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
