// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.UsersState,
  action: a.SetMultipleInStateAction,
): m.UsersState => {
  const { users } = action.payload;

  if (users.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    users.forEach((user: m.User): void => {
      newById[user.id] = user;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
