// @flow
/* eslint-disable no-multiple-empty-lines */


// Action constants --------------------------------------------------------------------------------

export const FETCH: 'users/FETCH' = 'users/FETCH';


// Action types ------------------------------------------------------------------------------------

export type FetchAction = {|
  type: typeof FETCH,
  payload: {
    id: string,
  },
|};
