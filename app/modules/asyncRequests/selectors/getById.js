// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getById = (state: State, props: { id: string }): ?m.AsyncRequest => {
  const { id } = props;
  return state.modules.asyncRequests.byId[id] || null;
};

export default getById;
