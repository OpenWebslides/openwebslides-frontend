// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.PullRequest => {
  const { id } = props;
  return state.modules.pullRequests.byId[id] || null;
};

export default getById;
