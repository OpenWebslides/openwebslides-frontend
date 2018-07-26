// @flow

import _ from 'lodash';

import { InvalidArgumentError, UnsupportedOperationError } from 'errors';
import contentItems from 'modules/contentItems';

import * as a from './actionTypes';
import * as m from './model';

// Reducer actions
export const addToState = (
  id: string,
  userId: string,
  title: string,
  description: ?string = null,
  rootContentItemId: string,
): a.AddToStateAction => {
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  return {
    type: a.ADD_TO_STATE,
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
  id: string,
  title: ?string = null,
  description: ?string = null,
): a.EditInStateAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  if (newTitle === null && newDescription === null) {
    throw new UnsupportedOperationError(`Action must contain at least one edit`);
  }

  return {
    type: a.EDIT_IN_STATE,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export const removeFromState = (
  id: string,
): a.RemoveFromStateAction => {
  return {
    type: a.REMOVE_FROM_STATE,
    payload: {
      id,
    },
  };
};

export const setItemsInState = (
  items: $ReadOnlyArray<m.Topic>,
): a.SetItemsInStateAction => {
  return {
    type: a.SET_ITEMS_IN_STATE,
    payload: {
      items,
    },
  };
};

// Task saga actions
export const add = (
  userId: string,
  title: string,
  description: ?string = null,
): a.AddAction => {
  const newId = m.generateId();
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  return {
    type: a.ADD,
    payload: {
      id: newId,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId: 'w4lg2u0p1h', // #TODO stub
    },
  };
};

export const edit = (
  id: string,
  title: ?string = null,
  description: ?string = null,
): a.EditAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  if (newTitle === null && newDescription === null) {
    throw new UnsupportedOperationError(`Action must contain at least one edit`);
  }

  return {
    type: a.EDIT,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export const remove = (
  id: string,
): a.RemoveAction => {
  return {
    type: a.REMOVE,
    payload: {
      id,
    },
  };
};

export const get = (
  id: string,
): a.GetAction => {
  return {
    type: a.GET,
    payload: {
      id,
    },
  };
};

export const getAllByUserId = (
  userId: string,
): a.GetAllByUserIdAction => {
  return {
    type: a.GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export const save = (
  id: string,
): a.SaveContentAction => {
  return {
    type: a.SAVE,
    payload: {
      id,
    },
  };
};

export const load = (
  id: string,
): a.LoadContentAction => {
  return {
    type: a.LOAD,
    payload: {
      id,
    },
  };
};

// API saga actions
export const apiDelete = (
  id: string,
): a.ApiDeleteTopicAction => {
  return {
    type: a.API_DELETE,
    payload: {
      id,
    },
  };
};

export const apiGetAllByUserId = (
  userId: string,
): a.ApiGetAllTopicsByUserIdAction => {
  return {
    type: a.API_GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export const apiGet = (
  id: string,
): a.ApiGetTopicAction => {
  return {
    type: a.API_GET,
    payload: {
      id,
    },
  };
};

export const apiPost = (
  userId: string,
  title: string,
  description: ?string,
): a.ApiPostTopicAction => {
  return {
    type: a.API_POST,
    payload: {
      userId,
      title,
      description,
    },
  };
};

export const apiPatchContent = (
  id: string,
  content: $ReadOnlyArray<contentItems.model.ContentItem>,
): a.ApiPatchTopicContentAction => {
  return {
    type: a.API_PATCH_CONTENT,
    payload: {
      id,
      content,
    },
  };
};

export const apiGetContent = (
  id: string,
): a.ApiGetTopicContentAction => {
  return {
    type: a.API_GET_CONTENT,
    payload: {
      id,
    },
  };
};
