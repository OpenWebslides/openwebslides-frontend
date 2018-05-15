// @flow

import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../actionTypes';
import type {
  ContentItemsState,
} from '../model';

import { dummyContentItemsById } from '../dummyData';

import addToState from './addToState';
import editInState from './editInState';
import setMultipleInState from './setMultipleInState';

const initialState: ContentItemsState = {
  byId: dummyContentItemsById,
};

const reducer = (
  state: ContentItemsState = initialState,
  action: t.ReducerAction,
): ContentItemsState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addToState(state, action);
    case t.EDIT_IN_STATE:
      return editInState(state, action);
    case t.REMOVE_FROM_STATE:
    case t.SET_IN_STATE:
      throw new NotYetImplementedError();
    case t.SET_MULTIPLE_IN_STATE:
      return setMultipleInState(state, action);
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
