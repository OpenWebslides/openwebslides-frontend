// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const EDIT_TOPIC_IDS_IN_STATE: 'users/EDIT_TOPIC_IDS_IN_STATE' = 'users/EDIT_TOPIC_IDS_IN_STATE';
export const SET_MULTIPLE_IN_STATE: 'users/SET_MULTIPLE_IN_STATE' = 'users/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type EditTopicIdsInStateAction = {|
  type: typeof EDIT_TOPIC_IDS_IN_STATE,
  payload: {
    id: string,
    topicIds: $ReadOnlyArray<string>,
  },
|};

export type SetMultipleInStateAction = {|
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    users: $ReadOnlyArray<m.User>,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type UsersReducerAction =
  | EditTopicIdsInStateAction
  | SetMultipleInStateAction;
