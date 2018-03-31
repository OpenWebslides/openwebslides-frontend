// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { ContentItem, ContentItemsState } from './model';

type AllById = {
  +[contentItemId: Identifier]: ContentItem,
};

const getModule = (state: State): ContentItemsState => {
  return state.modules.contentItems;
};

export const getById = (state: State, props: { id: Identifier }): ContentItem => {
  return _.get(getModule(state), props.id, null);
};

export const getAllById = (state: State): AllById => {
  return getModule(state);
};

export const getAll = createSelector(
  [getAllById],
  (allById: AllById): Array<ContentItem> => {
    return Object.keys(allById).map((key) => allById[key]);
  },
);
