// @flow
/* eslint-disable no-multiple-empty-lines */


// Action constants --------------------------------------------------------------------------------

export const API_GET: 'users/API_GET' = 'users/API_GET';
export const API_POST: 'users/API_POST' = 'users/API_POST';


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
    email: string,
    firstName: string,
    lastName: ?string,
    password: string,
    tosAccepted: boolean,
  },
|};
