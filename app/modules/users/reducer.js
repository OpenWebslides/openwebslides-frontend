// @flow

import { dummyUsers } from './dummyData';

import type { User, UsersState } from './model';
import * as at from './actionTypes';

const initialState: UsersState = dummyUsers;

const add = (state: UsersState, action: at.AddAction): UsersState => {
  const {
    id,
    firstName,
    lastName,
    email,
    password,
  } = action.payload;

  const newUser: User = {
    id,
    firstName,
    lastName,
    email,
    password,
  };

  return {
    ...state,
    [id]: newUser,
  };
};

const reducer = (state: UsersState = initialState, action: at.UserAction): UsersState => {
  switch (action.type) {
    case at.ADD:
      return add(state, action);
    case at.ADD_ERROR:
      return state;
    default:
      // Type error when not all action.type cases are handled.
      // eslint-disable-next-line no-unused-expressions
      (action: empty);
      return state;
  }
};

export default reducer;
