// @flow

import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector(
  [getAllById],
  (alertsById: m.AlertsById): $ReadOnlyArray<m.Alert> => {
    return Object.keys(alertsById).map((key) => alertsById[key]);
  },
);

export default getAll;
