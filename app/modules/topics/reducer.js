// @flow

import _ from 'lodash';

import { dummyTopicsById } from './dummyData';

import * as t from './actionTypes';
import type { Topic, TopicsState } from './model';

const initialState: TopicsState = {
  byId: dummyTopicsById,
};

const addToState = (state: TopicsState, action: t.AddToStateAction): TopicsState => {
  const {
    id,
    userId,
    title,
    description,
    rootContentItemId,
  } = action.payload;

  const newTopic: Topic = {
    id,
    userId,
    title,
    description,
    rootContentItemId,
  };

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: newTopic,
    },
  };
};

const editInState = (state: TopicsState, action: t.EditAction): TopicsState => {
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

const removeFromState = (state: TopicsState, action: t.RemoveFromStateAction): TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

const reducer = (state: TopicsState = initialState, action: t.TopicReducerAction): TopicsState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addToState(state, action);
    case t.EDIT_IN_STATE:
      return editInState(state, action);
    case t.REMOVE_FROM_STATE:
      return removeFromState(state, action);
    case t.ADD_TO_STATE_ERROR:
    case t.EDIT_IN_STATE_ERROR:
    case t.REMOVE_FROM_STATE_ERROR:
      return state;
    default:
      return state;
  }
};

export default reducer;
