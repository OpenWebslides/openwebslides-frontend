// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyAlertData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`markAsReadInState`, (): void => {

  let dummyAlert: m.Alert;

  beforeEach((): void => {
    dummyAlert = { ...dummyAlertData.updateAlert1, read: false };
  });

  it(`sets the read property to TRUE for the alert with the passed id`, (): void => {
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert.id]: { ...dummyAlert, read: false },
      },
    };
    const markAsReadInStateAction: a.MarkAsReadInStateAction = {
      type: a.MARK_AS_READ_IN_STATE,
      payload: {
        id: dummyAlert.id,
      },
    };
    const nextState: m.AlertsState = {
      byId: {
        [dummyAlert.id]: { ...dummyAlert, read: true },
      },
    };
    const resultState = reducer(prevState, markAsReadInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyAlert.id]).not.toBe(prevState.byId[dummyAlert.id]);
  });

  it(`returns the state unchanged, when the alert's read property was already set to TRUE`, (): void => {
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert.id]: { ...dummyAlert, read: true },
      },
    };
    const markAsReadInStateAction: a.MarkAsReadInStateAction = {
      type: a.MARK_AS_READ_IN_STATE,
      payload: {
        id: dummyAlert.id,
      },
    };
    const resultState = reducer(prevState, markAsReadInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyAlert.id]).toBe(prevState.byId[dummyAlert.id]);
  });

  it(`throws an ObjectNotFoundError, when the alert for the passed id could not be found in the state`, (): void => {
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert.id]: { ...dummyAlert, read: true },
      },
    };
    const markAsReadInStateAction: a.MarkAsReadInStateAction = {
      type: a.MARK_AS_READ_IN_STATE,
      payload: {
        id: 'InvalidId',
      },
    };

    expect((): void => {
      reducer(prevState, markAsReadInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
