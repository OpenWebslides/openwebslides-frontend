// @flow

import * as t from './actionTypes';
import type { SlideStyling, SlideStylingState } from './model';

const initialState: SlideStylingState = {
  byId: {},
};

const addToState = (state: SlideStylingState, action: t.AddToStateAction): SlideStylingState => {
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

const editInState = (
  state: SlideStylingState,
  action: t.EditContentTypeColorAction): SlideStylingState => {
  const { id, contentItemType, newColor } = action.payload;
  let editedSlideStyling: SlideStyling = state.byId[id];
  if (newColor != null) {
    editedSlideStyling = {
      ...editedSlideStyling, rules: { [contentItemType]: { color: newColor } },
    };
  }
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: editedSlideStyling,
    },
  };
};

const reducer = (
  state: SlideStylingState = initialState,
  action: t.SlideStylingReducerAction): SlideStylingState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addToState(state, action);
    case t.EDIT_CONTENTTYPE_COLOR_IN_STATE:
      return editInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
