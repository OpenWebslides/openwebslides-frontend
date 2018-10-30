// @flow

import getAll from './getAll';
import getAllByCurrentUser from './getAllByCurrentUser';
import getAllByCurrentUserSortedDescByTimestamp from './getAllByCurrentUserSortedDescByTimestamp';
import getAllById from './getAllById';
import getById from './getById';

const selectors = {
  getAll,
  getAllByCurrentUser,
  getAllByCurrentUserSortedDescByTimestamp,
  getAllById,
  getById,
};

export default selectors;
