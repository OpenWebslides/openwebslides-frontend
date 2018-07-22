// @flow

import _ from 'lodash';

import { dummyTopicsById } from './dummyData';
import * as a from './actionTypes';
import type { Topic, TopicsState } from './model';

const initialState: TopicsState = {
  byId: dummyTopicsById,
};

const addToState = (state: TopicsState, action: a.AddToStateAction): TopicsState => {
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

const editInState = (state: TopicsState, action: a.EditInStateAction): TopicsState => {
  const { id, title, description } = action.payload;
  let editedTopic: Topic = state.byId[id];

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

const removeFromState = (state: TopicsState, action: a.RemoveFromStateAction): TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

const setItemsInState = (state: TopicsState, action: a.SetItemsInStateAction): TopicsState => {
  const newTopics = {};

  if (action.payload.items) {
    action.payload.items.forEach((item: Topic): void => {
      newTopics[item.id] = item;
    });
  }

  return {
    byId: newTopics,
  };
};

const reducer = (state: TopicsState = initialState, action: a.TopicReducerAction): TopicsState => {
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
