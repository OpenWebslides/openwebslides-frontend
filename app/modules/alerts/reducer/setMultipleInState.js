// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.AlertsState,
  action: a.SetMultipleInStateAction,
): m.AlertsState => {
  const { alerts } = action.payload;

  if (alerts.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    alerts.forEach((alert: m.Alert): void => {
      newById[alert.id] = alert;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
