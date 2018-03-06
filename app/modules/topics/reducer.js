// @flow

import _ from 'lodash';
import * as t from './actionTypes';
import type { TopicsState } from './index';
import type { Topic } from './model';

const initialState: TopicsState = {
  abcdefghij: {
    id: 'abcdefghij',
    title: 'Test topic 1',
    description: 'Lorem ipsum dolor sit amet.',
  },
  klmnopqrst: {
    id: 'klmnopqrst',
    title: 'Test topic 2',
    description: '',
  },
};

const add = (state: TopicsState, action: t.AddAction): TopicsState => {
  const { id, title, description } = action.payload;

  const newTopic: Topic = {
    id,
    title,
    description,
  };

  return {
    ...state,
    [id]: newTopic,
  };
};

const edit = (state: TopicsState, action: t.EditAction): TopicsState => {
  const { id, title, description } = action.payload;
  let editedTopic: Topic = state[id];

  if (title != null) editedTopic = { ...editedTopic, title };
  if (description != null) editedTopic = { ...editedTopic, description };

  return {
    ...state,
    [id]: editedTopic,
  };
};

const remove = (state: TopicsState, action: t.RemoveAction): TopicsState => {
  const { id } = action.payload;
  return _.omit(state, id);
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
