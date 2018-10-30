// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getAllById = (state: AppState): m.AlertsById => {
  return state.modules.alerts.byId;
};

export default getAllById;
