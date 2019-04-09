// @flow

import getAll from './getAll';
import getAllById from './getAllById';
import getById from './getById';
import getCurrentlyEditing from './getCurrentlyEditing';
import getCurrentlySelectedId from './getCurrentlySelectedId';
import getDenormalizedById from './getDenormalizedById';

const selectors = {
  getAll,
  getAllById,
  getById,
  getCurrentlyEditing,
  getCurrentlySelectedId,
  getDenormalizedById,
};

export default selectors;
