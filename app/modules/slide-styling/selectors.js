// @flow

import _ from 'lodash';
import type { State } from 'types/state';
import { createSelector } from 'reselect';
import type { Identifier } from 'types/model';
import type { SlideStyling, SlideStylingById, SlideStylingState } from './model';

const getModule = (state: State): SlideStylingState => {
  return state.modules.slideStyling;
};

export const getAllById = (state: State): SlideStylingById => {
  return getModule(state).byId;
};

export const getAll = createSelector(
  [getAllById],
  (slideStylingById: SlideStylingById): Array<SlideStyling> => {
    return Object.keys(slideStylingById).map((key) => slideStylingById[key]);
  },
);

export const getById = (state: State, props: { id: Identifier }): SlideStyling => {
  return _.get(getAllById(state), props.id, null);
};

export const getAllSlideStylingIdsByUserId = (
  state: State, userId: Identifier): Array<Identifier> => {
  const slideStylingById = getAllById(state);
  return (
    Object
      .keys(slideStylingById)
      .map((key) => slideStylingById[key])
      .filter((slideStyling) => slideStyling.userId === userId)
      .map((slideStyling) => slideStyling.id)
  );
};
