// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.AsyncRequest => {
  const { id } = props;
  return state.modules.asyncRequests.byId[id] || null;
};

export default getById;
