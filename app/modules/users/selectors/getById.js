// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.User => {
  const { id } = props;
  return state.modules.users.byId[id] || null;
};

export default getById;
