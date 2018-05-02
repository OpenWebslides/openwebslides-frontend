// @flow

import _ from 'lodash';

import type { Identifier } from 'types/model';
import type { RouterHistory } from 'react-router-dom';
import type { Topic } from './model';

import * as t from './actionTypes';
import { generateId } from './model';

// Reducer actions
export const addToState = (
  id: Identifier,
  userId: Identifier,
  title: string,
  description: ?string = null,
  rootContentItemId: Identifier,
): t.AddToStateAction | t.AddToStateErrorAction => {
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    return {
      type: t.ADD_TO_STATE_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  return {
    type: t.ADD_TO_STATE,
    payload: {
      id,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId,
    },
  };
};

export const editInState = (
  id: Identifier,
  title: ?string = null,
  description: ?string = null,
): t.EditInStateAction | t.EditInStateErrorAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    return {
      type: t.EDIT_IN_STATE_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  if (newTitle === null && newDescription === null) {
    return {
      type: t.EDIT_IN_STATE_ERROR,
      error: {
        message: 'Action must contain at least one edit.',
      },
    };
  }

  return {
    type: t.EDIT_IN_STATE,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export const removeFromState = (
  id: Identifier,
): t.RemoveFromStateAction | t.RemoveFromStateErrorAction => {
  return {
    type: t.REMOVE_FROM_STATE,
    payload: {
      id,
    },
  };
};

export const setItemsInState = (
  items: Array<Topic>,
): t.SetItemsInStateAction => {
  return {
    type: t.SET_ITEMS_IN_STATE,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const add = (
  userId: Identifier,
  title: string,
  description: ?string = null,
  history: RouterHistory,
): t.AddAction | t.AddErrorAction => {
  const newId = generateId();
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    return {
      type: t.ADD_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  return {
    type: t.ADD,
    payload: {
      id: newId,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId: 'w4lg2u0p1h', // #TODO stub
      history,
    },
  };
};

export const edit = (
  id: Identifier,
  title: ?string = null,
  description: ?string = null,
): t.EditAction | t.EditErrorAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    return {
      type: t.EDIT_ERROR,
      error: {
        message: 'Title cannot be empty.',
      },
    };
  }

  if (newTitle === null && newDescription === null) {
    return {
      type: t.EDIT_ERROR,
      error: {
        message: 'Action must contain at least one edit.',
      },
    };
  }

  return {
    type: t.EDIT,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export const remove = (
  id: Identifier,
  modalType: string,
): t.RemoveAction | t.RemoveErrorAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
      modalType,
    },
  };
};

export const get = (
  id: Identifier,
): t.GetAction | t.GetErrorAction => {
  return {
    type: t.GET,
    payload: {
      id,
    },
  };
};

export const getAll = (
  userId: Identifier,
): t.GetAllAction | t.GetAllErrorAction => {
  return {
    type: t.GET_ALL,
    payload: {
      userId,
    },
  };
};

// API saga actions
export const apiDeleteTopic = (
  id: Identifier,
): t.ApiDeleteTopicAction => {
  return {
    type: t.API_DELETE_TOPIC,
    payload: {
      id,
    },
  };
};


export const apiGetAllTopics = (
  userId: Identifier,
): t.ApiGetAllTopicsAction => {
  return {
    type: t.API_GET_ALL_TOPICS,
    payload: {
      userId,
    },
  };
};

export const apiGetTopic = (
  id: Identifier,
): t.ApiGetTopicAction => {
  return {
    type: t.API_GET_TOPIC,
    payload: {
      id,
    },
  };
};

export const apiPostTopic = (
  userId: Identifier,
  title: string,
  description: ?string,
): t.ApiPostTopicAction => {
  return {
    type: t.API_POST_TOPIC,
    payload: {
      userId,
      title,
      description,
    },
  };
};
