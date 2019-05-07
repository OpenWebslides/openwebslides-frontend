// @flow

import canIndent from './canIndent';
import canUnindent from './canUnindent';
import getAll from './getAll';
import getAllById from './getAllById';
import getById from './getById';
import getCurrentlyEditing from './getCurrentlyEditing';
import getCurrentlySelectedId from './getCurrentlySelectedId';
import getDenormalizedById from './getDenormalizedById';

const selectors = {
  canIndent,
  canUnindent,
  getAll,
  getAllById,
  getById,
  getCurrentlyEditing,
  getCurrentlySelectedId,
  getDenormalizedById,
};

export default selectors;
