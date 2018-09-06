// @flow

/* eslint-disable no-multiple-empty-lines, flowtype/require-types-at-top */

import * as m from '../model';


// Action constants --------------------------------------------------------------------------------

export const SET_MULTIPLE_IN_STATE: 'feedItems/SET_MULTIPLE_IN_STATE' = 'feedItems/SET_MULTIPLE_IN_STATE';


// Action types ------------------------------------------------------------------------------------

export type SetMultipleInStateAction = {|
  type: typeof SET_MULTIPLE_IN_STATE,
  payload: {
    feedItems: $ReadOnlyArray<m.FeedItem>,
  },
|};


// Reducer action ----------------------------------------------------------------------------------

export type ReducerAction =
  | SetMultipleInStateAction;
