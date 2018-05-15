// @flow

import { contentItemTypes } from '../content-items/model';
import * as t from './actionTypes';
import type { SlideStyling, SlideStylingRules, SlideStylingState } from './model';
import { dummySlideStylingById } from './dummyData';


const initialState: SlideStylingState = {
  byId: dummySlideStylingById,
};

const addToState = (state: SlideStylingState, action: t.AddToStateAction): SlideStylingState => {
  const {
    id,
  } = action.payload;

  let newSlideStyling: SlideStyling = action.payload;

  newSlideStyling = {
    ...newSlideStyling, rules: { [contentItemTypes.HEADING]: { color: '#000000' }, [contentItemTypes.PARAGRAPH]: { color: '#000000' } },
  };
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: newSlideStyling,
    },
  };
};

const editContentTypeColorInState = (
  state: SlideStylingState,
  action: t.EditContentTypeColorAction): SlideStylingState => {
  const { id, contentItemType, newColor } = action.payload;
  let editedSlideStyling: SlideStyling = state.byId[id];

  if (editedSlideStyling == null) {
    throw new Error(`ContentItem with id "${id}" could not be found.`);
  }
  // eslint-disable-next-line prefer-destructuring
  let rules: SlideStylingRules = state.byId[id].rules;

  if (newColor != null) {
    rules = { ...rules, [contentItemType]: { color: newColor } };
    editedSlideStyling = { ...editedSlideStyling, rules };
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
      return editContentTypeColorInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
