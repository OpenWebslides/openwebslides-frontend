// @flow

import _ from 'lodash';

import * as t from './actionTypes';
import type { Topic, TopicsState } from './model';

const initialState: TopicsState = {
  byId: {},
};

const addToState = (state: TopicsState, action: t.AddToStateAction): TopicsState => {
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

const editInState = (state: TopicsState, action: t.EditInStateAction): TopicsState => {
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

const setItemsInState = (state: TopicsState, action: t.SetItemsInStateAction): TopicsState => {
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

const reducer = (state: TopicsState = initialState, action: t.TopicReducerAction): TopicsState => {
  switch (action.type) {
    case t.ADD_TO_STATE:
      return addToState(state, action);
    case t.EDIT_IN_STATE:
      return editInState(state, action);
    case t.REMOVE_FROM_STATE:
      return removeFromState(state, action);
    case t.SET_ITEMS_IN_STATE:
      return setItemsInState(state, action);
    case t.ADD_TO_STATE_ERROR:
    case t.EDIT_IN_STATE_ERROR:
    case t.REMOVE_FROM_STATE_ERROR:
    case t.SET_ITEMS_IN_STATE_ERROR:
      return state;
    default:
      // Make sure a flow type error is thrown when not all action.type cases are handled
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
