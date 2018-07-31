// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */


// Action constants --------------------------------------------------------------------------------

export const API_GET_ALL_BY_TOPIC_ID: 'topics/API_GET_ALL_BY_TOPIC_ID' = 'topics/API_GET_ALL_BY_TOPIC_ID';
export const API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT: 'topics/API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT' = 'topics/API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT';


// Action types ------------------------------------------------------------------------------------

export type ApiGetAllByTopicIdAction = {|
  type: typeof API_GET_ALL_BY_TOPIC_ID,
  payload: {
    topicId: string,
  },
|};

export type ApiPatchAllByTopicIdAndRootAction = {|
  type: typeof API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT,
  payload: {
    topicId: string,
    rootContentItemId: string,
  },
|};


// ApiSaga action ----------------------------------------------------------------------------------

export type ApiSagaAction =
  | ApiGetAllByTopicIdAction
  | ApiPatchAllByTopicIdAndRootAction;
