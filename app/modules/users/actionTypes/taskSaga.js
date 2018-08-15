// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const ADD_TOPIC: 'users/ADD_TOPIC' = 'users/ADD_TOPIC';
export const ADD_TOPIC_ID: 'users/ADD_TOPIC_ID' = 'users/ADD_TOPIC_ID';
export const FETCH: 'users/FETCH' = 'users/FETCH';
export const REMOVE_TOPIC: 'users/REMOVE_TOPIC' = 'users/REMOVE_TOPIC';
export const REMOVE_TOPIC_ID: 'users/REMOVE_TOPIC_ID' = 'users/REMOVE_TOPIC_ID';


// Action types ------------------------------------------------------------------------------------

export type AddTopicAction = {|
  type: typeof ADD_TOPIC,
  payload: {
    id: string,
    title: string,
    description: ?string,
  },
|};

export type RemoveTopicIdAction = {|
  type: typeof REMOVE_TOPIC_ID,
  payload: {
    id: string,
    topicId: string,
  },
|};

export type FetchAction = {|
  type: typeof FETCH,
  payload: {
    id: string,
  },
|};

export type RemoveTopicAction = {|
  type: typeof REMOVE_TOPIC,
  payload: {
    id: string,
    topicId: string,
  },
|};

export type AddTopicIdAction = {|
  type: typeof ADD_TOPIC_ID,
  payload: {
    id: string,
    topicId: string,
  },
|};


// TaskSaga action ---------------------------------------------------------------------------------

export type TaskSagaAction =
  | AddTopicAction
  | AddTopicIdAction
  | FetchAction
  | RemoveTopicAction
  | RemoveTopicIdAction;
