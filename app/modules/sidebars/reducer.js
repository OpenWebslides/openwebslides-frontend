// @flow

import _ from 'lodash';

import * as t from './actionTypes';
import type { SidebarName, SidebarsState } from './model';

const initialState: SidebarsState = { activeSidebars: [] };

const toggleSidebar = (state: SidebarsState, action: t.ToggleAction): SidebarsState => {
  const {
    sidebarName,
  } = action.payload;

  let newActiveSidebars: Array<SidebarName>;

  if (_.indexOf(state.activeSidebars, sidebarName) >= 0) {
    newActiveSidebars = _.without(state.activeSidebars, sidebarName);
  }
  else {
    newActiveSidebars = _.concat(state.activeSidebars, sidebarName);
  }

  return {
    ...state,
    activeSidebars: [
      ...newActiveSidebars,
    ],
  };
};

const reducer = (state: SidebarsState = initialState, action: t.SidebarAction): SidebarsState => {
  switch (action.type) {
    case t.TOGGLE:
      return toggleSidebar(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
