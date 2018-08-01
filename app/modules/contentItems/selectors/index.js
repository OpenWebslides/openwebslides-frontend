// @flow

import getAll from './getAll';
import getAllById from './getAllById';
import getById from './getById';
import getCurrentlyEditing from './getCurrentlyEditing';
import getDenormalizedById from './getDenormalizedById';
import getSelfAndAllDescendantsById from './getSelfAndAllDescendantsById';

const selectors = {
  getAll,
  getAllById,
  getById,
  getCurrentlyEditing,
  getDenormalizedById,
  getSelfAndAllDescendantsById,
};

export default selectors;
