// @flow

import type { State } from 'types/state';
import type { SidebarName, SidebarsState } from './model';

const getModule = (state: State): SidebarsState => {
  return state.modules.sidebars;
};

export const getAllActiveSidebars = (state: State): Array<SidebarName> => {
  return getModule(state).activeSidebars;
};
