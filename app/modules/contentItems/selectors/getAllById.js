// @flow

import type { State } from 'types/state';

import type { ContentItemsById } from '../model';

const getAllById = (state: State): ContentItemsById => {
  return state.modules.contentItems.byId;
};

export default getAllById;
