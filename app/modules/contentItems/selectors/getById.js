// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getById = (state: State, props: { id: string }): ?m.ContentItem => {
  const { id } = props;
  return state.modules.contentItems.byId[id] || null;
};

export default getById;
