// @flow

import getAll from './getAll';
import getAllById from './getAllById';
import getAllPending from './getAllPending';
import getById from './getById';
import isRefreshing from './isRefreshing';

const selectors = {
  getAll,
  getAllById,
  getAllPending,
  getById,
  isRefreshing,
};

export default selectors;
