// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getById = (state: State, props: { id: string }): ?m.FeedItem => {
  const { id } = props;
  return state.modules.feedItems.byId[id] || null;
};

export default getById;
