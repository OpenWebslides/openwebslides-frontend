// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setCurrentlySelectedInState = (
  state: m.ContentItemsState,
  action: a.SetCurrentlySelectedInStateAction,
): m.ContentItemsState => {
  if (action.payload.id === state.currentlySelectedId) {
    return state;
  }

  return {
    ...state,
    currentlySelectedId: action.payload.id,
  };
};

export default setCurrentlySelectedInState;
