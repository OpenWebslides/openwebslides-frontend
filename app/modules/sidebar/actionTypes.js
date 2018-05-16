// @flow

export const TOGGLE: 'sidebar/TOGGLE' = 'sidebar/TOGGLE';

export const TOGGLE_ERROR: 'sidebar/TOGGLE_ERROR' = 'sidebar/TOGGLE_ERROR';

export type ToggleAction = {
  type: typeof TOGGLE,
  payload: {
    sidebarName: string,
  },
};

export type ToggleErrorAction = {
  type: typeof TOGGLE_ERROR,
  error: Error,
};

export type SidebarAction =
  | ToggleAction
  | ToggleErrorAction;
