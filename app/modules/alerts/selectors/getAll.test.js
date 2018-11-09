// @flow

import { dummyAlertData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAll`, (): void => {

  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlertsById: m.AlertsById;
  let dummyAlertsState: m.AlertsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyAlert1 = { ...dummyAlertData.updateAlert1 };
    dummyAlert2 = { ...dummyAlertData.PRSubmittedAlert };
    dummyAlertsById = {
      [dummyAlert1.id]: dummyAlert1,
      [dummyAlert2.id]: dummyAlert2,
    };
    dummyAlertsState = { byId: dummyAlertsById };
    dummyState = { modules: { alerts: dummyAlertsState } };
    dummyEmptyState = { modules: { alerts: { byId: {} } } };
  });

  it(`returns an array containing all alerts, when there are one or more alerts in the state`, (): void => {
    const alerts = selectors.getAll(dummyState);
    expect(alerts).toStrictEqual([dummyAlert1, dummyAlert2]);
  });

  it(`returns an empty array, when there are no alerts in the state`, (): void => {
    const alerts = selectors.getAll(dummyEmptyState);
    expect(alerts).toStrictEqual([]);
  });

});
