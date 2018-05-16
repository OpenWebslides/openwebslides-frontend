// @flow

import _ from 'lodash';
import type { State } from 'types/state';
import type { Sidebar, SidebarsByName, SidebarsState } from './model';

const getModule = (state: State): SidebarsState => {
  return state.modules.sidebar;
};

export const getAllByName = (state: State): SidebarsByName => {
  console.log("byName:");
  console.log(getModule(state).byName);

  return getModule(state).byName;
};

export const getByName = (state: State, props: { sidebarName: string }): Sidebar => {
  return _.get(getAllByName(state), props.sidebarName, null);
};
