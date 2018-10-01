// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.ContentItem => {
  const { id } = props;
  return state.modules.contentItems.byId[id] || null;
};

export default getById;
