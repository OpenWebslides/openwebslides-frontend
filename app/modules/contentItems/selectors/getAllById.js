// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.ContentItemsById => {
  return state.modules.contentItems.byId;
};

export default getAllById;
