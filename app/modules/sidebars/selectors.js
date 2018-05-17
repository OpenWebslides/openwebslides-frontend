// @flow

import type { State } from 'types/state';
import type { SidebarsByName, SidebarsState } from './model';

const getModule = (state: State): SidebarsState => {
  return state.modules.sidebars;
};

export const getAllByName = (state: State): SidebarsByName => {
  return getModule(state).byName;
};
