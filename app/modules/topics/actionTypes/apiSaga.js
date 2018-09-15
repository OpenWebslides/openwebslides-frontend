// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'topics/API_GET' = 'topics/API_GET';
export const API_POST: 'topics/API_POST' = 'topics/API_POST';
export const API_DELETE: 'topics/API_DELETE' = 'topics/API_DELETE';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAction = {|
  type: typeof API_GET,
  payload: {
    id: string,
  },
|};

export type ApiPostAction = {|
  type: typeof API_POST,
  payload: {
    title: string,
    description: ?string,
    rootContentItemId: string,
    userId: string,
  },
|};

export type ApiDeleteAction = {|
  type: typeof API_DELETE,
  payload: {
    id: string,
  },
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type TopicsApiSagaAction =
  | ApiGetAction
  | ApiPostAction
  | ApiDeleteAction;
