// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.FeedItemsById => {
  return state.modules.feedItems.byId;
};

export default getAllById;
