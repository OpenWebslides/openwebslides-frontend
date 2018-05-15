// @flow

import _ from 'lodash';

import * as t from './actionTypes';
import type { Sidebar, SidebarsState } from './model';

const initialState: SidebarsState = {};

const addToState = (state: SidebarsState, action: t.AddAction): SidebarsState => {
  const {
    id,
  } = action.payload;

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: action.payload,
    },
  };
};

const removeFromState = (state: SidebarsState, action: t.RemoveAction): SidebarsState => {
  const { id } = action.payload;

  return _.omit(state, id);
};

const reducer = (state: SidebarsState = initialState, action: t.SidebarAction): SidebarsState => {
  switch (action.type) {
    case t.ADD:
      return addSidebar(state, action);
    case t.REMOVE:
      return removeSidebar(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
