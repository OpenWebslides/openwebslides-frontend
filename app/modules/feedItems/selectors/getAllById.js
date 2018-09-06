// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getAllById = (state: State): m.FeedItemsById => {
  return state.modules.feedItems.byId;
};

export default getAllById;
