// @flow

import { dummyAlertData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`setMultipleInState`, (): void => {

  let dummyAlerts: $ReadOnlyArray<m.Alert>;

  beforeEach((): void => {
    dummyAlerts = [
      { ...dummyAlertData.updateAlert1 },
      { ...dummyAlertData.updateAlert2 },
      { ...dummyAlertData.pullRequestAlert1 },
      { ...dummyAlertData.pullRequestAlert2 },
    ];
  });

  it(`returns a alerts SET_MULTIPLE_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        alerts: dummyAlerts,
      },
    };
    const actualAction = actions.setMultipleInState(dummyAlerts);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
