// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getById = (state: AppState, props: { id: string }): ?m.FeedItem => {
  const { id } = props;
  return state.modules.feedItems.byId[id] || null;
};

export default getById;
