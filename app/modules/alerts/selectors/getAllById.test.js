// @flow

import { dummyAlertData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllById`, (): void => {

  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlertsById: m.AlertsById;
  let dummyAlertsState: m.AlertsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyAlert1 = { ...dummyAlertData.updateAlert1 };
    dummyAlert2 = { ...dummyAlertData.pullRequestAlert1 };
    dummyAlertsById = {
      [dummyAlert1.id]: dummyAlert1,
      [dummyAlert2.id]: dummyAlert2,
    };
    dummyAlertsState = { byId: dummyAlertsById };
    dummyState = { modules: { alerts: dummyAlertsState } };
    dummyEmptyState = { modules: { alerts: { byId: {} } } };
  });

  it(`returns an object mapping all alert ids to their alerts, when there are one or more alerts in the state`, (): void => {
    const alertsById = selectors.getAllById(dummyState);
    expect(alertsById).toBe(dummyAlertsById);
  });

  it(`returns an empty object, when there are no alerts in the state`, (): void => {
    const alertsById = selectors.getAllById(dummyEmptyState);
    expect(alertsById).toStrictEqual({});
  });

});
