// @flow

import _ from 'lodash';

import * as t from './actionTypes';
import type { SidebarsByName, SidebarsState } from './model';

const initialState: SidebarsState = { byName: [] };

const toggleSidebar = (state: SidebarsState, action: t.ToggleAction): SidebarsState => {
  const {
    sidebarName,
  } = action.payload;

  let newByName: SidebarsByName;

  if (_.indexOf(state.byName, sidebarName) >= 0) {
    newByName = _.without(state.byName, sidebarName);
  }
  else {
    newByName = _.concat(state.byName, sidebarName);
  }

  return {
    ...state,
    byName: [
      ...newByName,
    ],
  };
};

const reducer = (state: SidebarsState = initialState, action: t.SidebarAction): SidebarsState => {
  switch (action.type) {
    case t.TOGGLE:
      return toggleSidebar(state, action);
    case t.TOGGLE_ERROR:
      return state;
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
