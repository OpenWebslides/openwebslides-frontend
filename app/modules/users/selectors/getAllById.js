// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.UsersById => {
  return state.modules.users.byId;
};

export default getAllById;
