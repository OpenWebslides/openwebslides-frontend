// @flow

import * as a from '../actionTypes';
import * as m from '../model';

const setMultipleInState = (
  state: m.AlertsState,
  action: a.SetMultipleInStateAction,
): m.AlertsState => {
  const { Alerts } = action.payload;

  if (Alerts.length === 0) {
    return state;
  }
  else {
    const newById = { ...state.byId };

    Alerts.forEach((Alert: m.Alert): void => {
      newById[Alert.id] = Alert;
    });

    return {
      ...state,
      byId: newById,
    };
  }
};

export default setMultipleInState;
