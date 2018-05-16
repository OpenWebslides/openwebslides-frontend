// @flow

import * as t from './actionTypes';

export const toggle = (
  sidebarName: string,
): t.ToggleAction | t.ToggleErrorAction => {
  return {
    type: t.TOGGLE,
    payload: {
      sidebarName,
    },
  };
};
