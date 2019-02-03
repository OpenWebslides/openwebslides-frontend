// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import addToState from './addToState';
import convertInState from './convertInState';
import editPropsForTypeInState from './editPropsForTypeInState';
import switchEditingInState from './switchEditingInState';
import moveInState from './moveInState';
import removeFromState from './removeFromState';
import setMultipleInState from './setMultipleInState';

const initialState: m.ContentItemsState = {
  byId: {},
};

const reducer = (
  state: m.ContentItemsState = initialState,
  action: a.ContentItemsReducerAction,
): m.ContentItemsState => {
  switch (action.type) {
    case a.ADD_TO_STATE:
      return addToState(state, action);
    case a.CONVERT_IN_STATE:
      return convertInState(state, action);
    case a.EDIT_PROPS_FOR_TYPE_IN_STATE:
      return editPropsForTypeInState(state, action);
    case a.SWITCH_EDITING_IN_STATE:
      return switchEditingInState(state, action);
    case a.MOVE_IN_STATE:
      return moveInState(state, action);
    case a.REMOVE_FROM_STATE:
      return removeFromState(state, action);
    case a.SET_MULTIPLE_IN_STATE:
      return setMultipleInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;
