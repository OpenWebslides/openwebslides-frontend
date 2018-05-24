// @flow

/* Action constants */

// Reducer actions
export const SET_IN_STATE: 'history/SET_IN_STATE' = 'history/SET_IN_STATE';

// Task saga actions
export const REDIRECT: 'history/REDIRECT' = 'history/REDIRECT';

// API saga actions

/* Action types */

// Reducer actions
export type SetInStateAction = {
  type: typeof SET_IN_STATE,
  payload: {
    location: ?string,
  },
};

// Task saga actions
export type RedirectAction = {
  type: typeof REDIRECT,
  payload: {
    location: string,
  },
};

// API saga actions

export type HistoryReducerAction =
  | SetInStateAction;
