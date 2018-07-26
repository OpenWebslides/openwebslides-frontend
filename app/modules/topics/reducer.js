// @flow

import _ from 'lodash';

import { dummyTopicsById } from './dummyData';
import * as a from './actionTypes';
import * as m from './model';

const initialState: m.TopicsState = {
  byId: dummyTopicsById,
};

const addToState = (state: m.TopicsState, action: a.AddToStateAction): m.TopicsState => {
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

const editInState = (state: m.TopicsState, action: a.EditInStateAction): m.TopicsState => {
  const { id, title, description } = action.payload;
  let editedTopic: m.Topic = state.byId[id];

  if (title != null) editedTopic = { ...editedTopic, title };
  if (description != null) editedTopic = { ...editedTopic, description };

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: editedTopic,
    },
  };
};

const removeFromState = (state: m.TopicsState, action: a.RemoveFromStateAction): m.TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

const setItemsInState = (state: m.TopicsState, action: a.SetItemsInStateAction): m.TopicsState => {
  const newTopics = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: m.Topic): void => {
      newTopics[item.id] = item;
    });
  }

  return {
    byId: newTopics,
  };
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

export default reducer;
