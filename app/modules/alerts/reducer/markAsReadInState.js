// @flow

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const markAsReadInState = (
  state: m.AlertsState,
  action: a.MarkAsReadInStateAction,
): m.AlertsState => {
  const { id } = action.payload;
  const alertToMark = state.byId[id];
  if (alertToMark == null) throw new ObjectNotFoundError(`alerts:alert`, id);

  if (alertToMark.read) {
    return state;
  }

  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: { ...alertToMark, read: true },
      },
    };
  }
};

export default markAsReadInState;
