// @flow

import { dummyAlertData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlertsById: m.AlertsById;
  let dummyAlertsState: m.AlertsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyAlert1 = { ...dummyAlertData.updateAlert1 };
    dummyAlert2 = { ...dummyAlertData.pullRequestAlert1 };
    dummyAlertsById = {
      [dummyAlert1.id]: dummyAlert1,
      [dummyAlert2.id]: dummyAlert2,
    };
    dummyAlertsState = { byId: dummyAlertsById };
    dummyState = { modules: { alerts: dummyAlertsState } };
  });

  it(`returns the correct alert for the given id, when the given id is valid`, (): void => {
    const alert = selectors.getById(dummyState, { id: dummyAlert1.id });
    expect(alert).toBe(dummyAlert1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const alert = selectors.getById(dummyState, { id: 'InvalidId' });
    expect(alert).toBeNull();
  });

});
