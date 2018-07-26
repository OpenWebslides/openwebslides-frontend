// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getAllById = (state: State): m.UsersById => {
  return state.modules.users.byId;
};

export default getAllById;
