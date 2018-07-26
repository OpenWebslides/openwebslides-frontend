// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getAllById = (state: State): m.ContentItemsById => {
  return state.modules.contentItems.byId;
};

export default getAllById;
