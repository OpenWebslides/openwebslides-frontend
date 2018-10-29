// @flow

import { dummyAlertData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setMultipleInState`, (): void => {

  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlert3: m.Alert;

  beforeEach((): void => {
    dummyAlert1 = { ...dummyData.pullRequestAlert1 };
    dummyAlert2 = { ...dummyData.pullRequestAlert2 };
    dummyAlert3 = { ...dummyData.updateAlert1 };
  });

  it(`sets the passed Alerts in the state`, (): void => {
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert1.id]: dummyAlert1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        Alerts: [
          dummyAlert2,
          dummyAlert3,
        ],
      },
    };
    const nextState: m.AlertsState = {
      byId: {
        [dummyAlert1.id]: dummyAlert1,
        [dummyAlert2.id]: dummyAlert2,
        [dummyAlert3.id]: dummyAlert3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`overrides existing Alerts, when the id of an existing Alert is the same as the id of one of the passed Alerts`, (): void => {
    const editedDummyAlert2 = { ...dummyAlert2, topicId: 'anotherTopicId' };
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert1.id]: dummyAlert1,
        [dummyAlert2.id]: dummyAlert2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        Alerts: [
          editedDummyAlert2,
          dummyAlert3,
        ],
      },
    };
    const nextState: m.AlertsState = {
      byId: {
        [dummyAlert1.id]: dummyAlert1,
        [dummyAlert2.id]: editedDummyAlert2,
        [dummyAlert3.id]: dummyAlert3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`returns the state object unchanged, when the passed Alerts array is empty`, (): void => {
    const prevState: m.AlertsState = {
      byId: {
        [dummyAlert1.id]: dummyAlert1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        Alerts: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

});
