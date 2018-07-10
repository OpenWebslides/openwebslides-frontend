// @flow

import getAll from './getAll';
import getAllById from './getAllById';
import getById from './getById';
import getDenormalizedById from './getDenormalizedById';
import getSelfAndAllDescendantsById from './getSelfAndAllDescendantsById';
import getCurrentlyEditing from './getCurrentlyEditing';

const selectors = {
  getAll,
  getAllById,
  getById,
  getDenormalizedById,
  getSelfAndAllDescendantsById,
  getCurrentlyEditing,
};

export default selectors;
