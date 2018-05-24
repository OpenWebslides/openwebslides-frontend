// @flow

import * as t from './actionTypes';

// Reducer actions
export const setInState = (
  location: ?string,
): t.SetInStateAction => {
  return {
    type: t.SET_IN_STATE,
    payload: {
      location,
    },
  };
};

// Task saga actions
export const redirect = (
  location: string,
): t.RedirectAction => {
  return {
    type: t.REDIRECT,
    payload: {
      location,
    },
  };
};

// API saga actions
