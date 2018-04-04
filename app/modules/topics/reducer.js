// @flow

import _ from 'lodash';

import { dummyTopicsById } from './dummyData';

import * as t from './actionTypes';
import type { Topic, TopicsState } from './model';

const initialState: TopicsState = {
  byId: dummyTopicsById,
};

const add = (state: TopicsState, action: t.AddAction): TopicsState => {
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

const edit = (state: TopicsState, action: t.EditAction): TopicsState => {
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

const remove = (state: TopicsState, action: t.RemoveAction): TopicsState => {
  const { id } = action.payload;

  return {
    ...state,
    byId: _.omit(state.byId, id),
  };
};

const reducer = (state: TopicsState = initialState, action: t.TopicAction): TopicsState => {
  switch (action.type) {
    case t.ADD:
      return add(state, action);
    case t.EDIT:
      return edit(state, action);
    case t.REMOVE:
      return remove(state, action);
    case t.ADD_ERROR:
    case t.EDIT_ERROR:
    case t.REMOVE_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
