// @flow

import * as t from './actionTypes';
import type { SidebarName } from './model';

export const toggle = (
  sidebarName: SidebarName,
): t.ToggleAction => {
  return {
    type: t.TOGGLE,
    payload: {
      sidebarName,
    },
  };
};
