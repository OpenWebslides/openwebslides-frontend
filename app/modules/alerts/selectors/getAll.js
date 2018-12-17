// @flow

import { createSelector } from 'reselect';

import { type AppState } from 'types/redux';

import * as m from '../model';

import getAllById from './getAllById';

const getAll = createSelector<AppState, ?{}, $ReadOnlyArray<m.Alert>, m.AlertsById>(
  [getAllById],
  (alertsById: m.AlertsById): $ReadOnlyArray<m.Alert> => {
    return Object.keys(alertsById).map((key) => alertsById[key]);
  },
);

export default getAll;
