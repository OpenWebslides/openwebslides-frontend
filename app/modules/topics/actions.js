// @flow

import _ from 'lodash';

import { InvalidArgumentError, UnsupportedOperationError } from 'errors';
import contentItems from 'modules/contentItems';

import * as t from './actionTypes';
import { generateId } from './model';
import type { Topic } from './model';

// Reducer actions
export const addToState = (
  id: string,
  userId: string,
  title: string,
  description: ?string = null,
  rootContentItemId: string,
): t.AddToStateAction => {
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
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
  id: string,
  title: ?string = null,
  description: ?string = null,
): t.EditInStateAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  if (newTitle === null && newDescription === null) {
    throw new UnsupportedOperationError(`Action must contain at least one edit`);
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
  id: string,
): t.RemoveFromStateAction => {
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
  userId: string,
  title: string,
  description: ?string = null,
): t.AddAction => {
  const newId = generateId();
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  return {
    type: t.ADD,
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
): t.EditAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  if (newTitle === null && newDescription === null) {
    throw new UnsupportedOperationError(`Action must contain at least one edit`);
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
  id: string,
): t.RemoveAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

export const get = (
  id: string,
): t.GetAction => {
  return {
    type: t.GET,
    payload: {
      id,
    },
  };
};

export const getAllByUserId = (
  userId: string,
): t.GetAllByUserIdAction => {
  return {
    type: t.GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export const save = (
  id: string,
): t.SaveContentAction => {
  return {
    type: t.SAVE,
    payload: {
      id,
    },
  };
};

export const load = (
  id: string,
): t.LoadContentAction => {
  return {
    type: t.LOAD,
    payload: {
      id,
    },
  };
};

// API saga actions
export const apiDelete = (
  id: string,
): t.ApiDeleteTopicAction => {
  return {
    type: t.API_DELETE,
    payload: {
      id,
    },
  };
};

export const apiGetAllByUserId = (
  userId: string,
): t.ApiGetAllTopicsByUserIdAction => {
  return {
    type: t.API_GET_ALL_BY_USERID,
    payload: {
      userId,
    },
  };
};

export const apiGet = (
  id: string,
): t.ApiGetTopicAction => {
  return {
    type: t.API_GET,
    payload: {
      id,
    },
  };
};

export const apiPost = (
  userId: string,
  title: string,
  description: ?string,
): t.ApiPostTopicAction => {
  return {
    type: t.API_POST,
    payload: {
      userId,
      title,
      description,
    },
  };
};

export const apiPatchContent = (
  id: string,
  content: Array<contentItems.model.ContentItem>,
): t.ApiPatchTopicContentAction => {
  return {
    type: t.API_PATCH_CONTENT,
    payload: {
      id,
      content,
    },
  };
};

export const apiGetContent = (
  id: string,
): t.ApiGetTopicContentAction => {
  return {
    type: t.API_GET_CONTENT,
    payload: {
      id,
    },
  };
};
