// @flow

import { dummyAlertData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';
import getAllByCurrentUser from './getAllByCurrentUser'

describe(`getAllByCurrentUser`, (): void => {

  let dummyUserId: string;
  let dummyUser2Id: string;
  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyAlert3: m.Alert;
  let dummyAlertsById: m.AlertsById;
  let dummyAlertsState: m.AlertsState;
  let dummyPlatformState: any;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyUser2Id = 'dummyUser2Id';
    dummyAlert1 = { ...dummyAlertData.updateAlert1, userId: dummyUserId };
    dummyAlert2 = { ...dummyAlertData.updateAlert2, userId: dummyUser2Id };
    dummyAlert3 = { ...dummyAlertData.PRSubmittedAlert, userId: dummyUserId };
    dummyAlertsById = {
      [dummyAlert1.id]: dummyAlert1,
      [dummyAlert2.id]: dummyAlert2,
      [dummyAlert3.id]: dummyAlert3,
    };
    dummyAlertsState = { byId: dummyAlertsById };
    dummyPlatformState = { userAuth: { userId: dummyUserId } };
  });

  it(`returns an array containing all alerts of the currently signed in user`, (): void => {
    const dummyState = {
      modules: {
        alerts: dummyAlertsState,
        platform: dummyPlatformState,
      },
    };

    const alerts = selectors.getAllByCurrentUser(dummyState);
    expect(alerts).toStrictEqual([dummyAlert1, dummyAlert3]);
  });

  it(`returns an empty array, when there are no alerts of the currently signed in user in the state`, (): void => {
    const dummyState = {
      modules: {
        alerts: { byId: { [dummyAlert2.id]: dummyAlert2 } },
        platform: dummyPlatformState,
      },
    };

    const alerts = selectors.getAllByCurrentUser(dummyState);
    expect(alerts).toStrictEqual([]);
  });

  it(`returns an empty array, when there is no user currently signed in`, (): void => {
    const dummyState = {
      modules: {
        alerts: dummyAlertsState,
        platform: { userAuth: null },
      },
    };

    const alerts = selectors.getAllByCurrentUser(dummyState);
    expect(alerts).toStrictEqual([]);
  });

});
