// @flow

import * as a from '../actionTypes';
import * as m from '../model';
import { dummyTopicsById } from '../dummyData';

import addToState from './addToState';
import editInState from './editInState';
import removeFromState from './removeFromState';
import setItemsInState from './setItemsInState';

const initialState: m.TopicsState = {
  byId: dummyTopicsById,
};

const reducer = (state: m.TopicsState = initialState, action: a.ReducerAction): m.TopicsState => {
  switch (action.type) {
    case a.ADD_TO_STATE:
      return addToState(state, action);
    case a.EDIT_IN_STATE:
      return editInState(state, action);
    case a.REMOVE_FROM_STATE:
      return removeFromState(state, action);
    case a.SET_ITEMS_IN_STATE:
      return setItemsInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      (action: empty);
      return state;
  }
};

export { initialState };
export default reducer;