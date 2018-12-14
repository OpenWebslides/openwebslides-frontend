// @flow

import { dummyAlertData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllByCurrentUserSortedDescByTimestamp`, (): void => {

  let dummyUserId: string;
  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlert3: m.Alert;
  let dummyAlertsById: m.AlertsById;
  let dummyAlertsState: m.AlertsState;
  let dummyPlatformState: any;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyAlert1 = { ...dummyAlertData.updateAlert1, userId: dummyUserId, timestamp: 1 };
    dummyAlert2 = { ...dummyAlertData.updateAlert2, userId: dummyUserId, timestamp: 2 };
    dummyAlert3 = { ...dummyAlertData.PRSubmittedAlert, userId: dummyUserId, timestamp: 3 };
    dummyAlertsById = {
      [dummyAlert2.id]: dummyAlert2,
      [dummyAlert1.id]: dummyAlert1,
      [dummyAlert3.id]: dummyAlert3,
    };
    dummyAlertsState = { byId: dummyAlertsById };
    dummyPlatformState = { userAuth: { userId: dummyUserId } };
  });

  it(`returns an array containing all alerts sorted by timestamp in descending order, when there are one or more alerts in the state`, (): void => {
    const dummyState: any = {
      modules: {
        alerts: dummyAlertsState,
        platform: dummyPlatformState,
      },
    };

    const alerts = selectors.getAllByCurrentUserSortedDescByTimestamp(dummyState);
    expect(alerts).toStrictEqual([dummyAlert3, dummyAlert2, dummyAlert1]);
  });

  it(`returns an empty array, when there are no alerts in the state`, (): void => {
    const dummyState: any = {
      modules: {
        alerts: { byId: {} },
        platform: dummyPlatformState,
      },
    };

    const alerts = selectors.getAllByCurrentUserSortedDescByTimestamp(dummyState);
    expect(alerts).toStrictEqual([]);
  });

});
