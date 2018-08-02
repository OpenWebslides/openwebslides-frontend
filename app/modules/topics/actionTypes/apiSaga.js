// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';
export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';


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

export type ApiPostTopicAction = {|
  type: typeof API_POST,
  payload: {
    userId: string,
    title: string,
    description: ?string,
  },
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type ApiSagaAction =
  | ApiDeleteTopicAction
  | ApiGetTopicAction
  | ApiPostTopicAction;
