// @flow

import type { SidebarName } from './model';

export const TOGGLE: 'sidebar/TOGGLE' = 'sidebar/TOGGLE';

export type ToggleAction = {
  type: typeof TOGGLE,
  payload: {
    sidebarName: SidebarName,
  },
};

export type SidebarAction =
  | ToggleAction;
