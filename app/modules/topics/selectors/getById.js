// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getById = (state: State, props: { id: string }): ?m.Topic => {
  const { id } = props;
  return state.modules.topics.byId[id] || null;
};

export default getById;
