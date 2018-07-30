// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';
export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_GET_ALL_BY_USERID: 'topics/API_GET_ALL_BY_USERID' = 'topics/API_GET_ALL_BY_USERID';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';
export const API_PATCH_CONTENT: 'topics/API_PATCH_CONTENT' = 'topics/API_PATCH_CONTENT';
export const API_GET_CONTENT: 'topics/API_GET_CONTENT' = 'topics/API_GET_CONTENT';


// Action types ------------------------------------------------------------------------------------

export type ApiDeleteTopicAction = {|
  type: typeof API_DELETE,
  payload: {
    id: string,
  },
|};

export type ApiGetTopicAction = {|
  type: typeof API_GET,
  payload: {
    id: string,
  },
|};

export type ApiGetAllTopicsByUserIdAction = {|
  type: typeof API_GET_ALL_BY_USERID,
  payload: {
    userId: string,
  },
|};

export type ApiPostTopicAction = {|
  type: typeof API_POST,
  payload: {
    userId: string,
    title: string,
    description: ?string,
  },
|};

export type ApiPatchTopicContentAction = {|
  type: typeof API_PATCH_CONTENT,
  payload: {
    id: string,
    // dependency on contentItems caused dependency cycle; move patch action to contentItems #TODO
    // content: $ReadOnlyArray<contentItems.model.ContentItem>,
    // eslint-disable-next-line flowtype/no-weak-types
    content: $ReadOnlyArray<any>,
  },
|};

export type ApiGetTopicContentAction = {|
  type: typeof API_GET_CONTENT,
  payload: {
    id: string,
  },
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type ApiSagaAction =
  | ApiDeleteTopicAction
  | ApiGetTopicAction
  | ApiGetAllTopicsByUserIdAction
  | ApiPostTopicAction
  | ApiPatchTopicContentAction
  | ApiGetTopicContentAction;
