// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`setSettingInState`, (): void => {

  it(`returns a platform SET_SETTING_IN_STATE action containing the passed props`, (): void => {
    const dummyKeyValuePair = { activeSidebarIds: [m.sidebarIds.TOPIC_INFO] };
    const expectedAction: a.SetSettingInStateAction = {
      type: a.SET_SETTING_IN_STATE,
      payload: {
        keyValuePair: dummyKeyValuePair,
      },
    };
    const actualAction = actions.setSettingInState(dummyKeyValuePair);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
