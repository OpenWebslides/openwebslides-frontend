// @flow

import * as t from './actionTypes';

export const addSidebar = (
  id: string,
): t.AddAction | t.AddErrorAction => {
  return {
    type: t.ADD,
    payload: {
      id,
    },
  };
};

export const removeSidebar = (
  id: string,
): t.RemoveAction | t.RemoveErrorAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

