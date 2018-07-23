// @flow

import { InvalidArgumentError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

// #TODO do we need this?
const addToState = (
  state: m.UsersState,
  action: a.AddToStateAction,
): m.UsersState => {
  const { id, firstName, lastName, email } = action.payload;
  if (state.byId[id] != null) throw new InvalidArgumentError(`User with id ${id} already exists.`);

  const newUser: m.User = { id, email, firstName, lastName };

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: newUser,
    },
  };
};

export default addToState;
