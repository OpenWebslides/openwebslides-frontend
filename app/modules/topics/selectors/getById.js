// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.Topic => {
  const { id } = props;
  return state.modules.topics.byId[id] || null;
};

export default getById;
