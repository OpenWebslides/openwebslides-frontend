// @flow

import * as t from './actionTypes';

export const toggle = (
  sidebarName: string,
): t.ToggleAction | t.ToggleErrorAction => {
  if (sidebarName == null || sidebarName === '') {
    return {
      type: t.TOGGLE_ERROR,
      error: {
        message: 'SidebarName cannot be empty.',
      },
    };
  }

  return {
    type: t.TOGGLE,
    payload: {
      sidebarName,
    },
  };
};
