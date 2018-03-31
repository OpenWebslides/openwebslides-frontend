// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import type { Topic, TopicsState } from './model';

type AllById = {
  +[topicId: Identifier]: Topic,
};

const getModule = (state: State): TopicsState => {
  return state.modules.topics;
};

export const getById = (state: State, props: { id: Identifier }): Topic => {
  return _.get(getModule(state), props.id, null);
};

// #TODO delete this; just select the entire topic instead and get the title from that
export const getTitleById = (state: State, id: Identifier): string => {
  return getModule(state)[id].title;
};

export const getAllById = (state: State): AllById => {
  return getModule(state);
};

export const getAll = createSelector(
  [getAllById],
  (allById: AllById): Array<Topic> => {
    return Object.keys(allById).map((key) => allById[key]);
  },
);
