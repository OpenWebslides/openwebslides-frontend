// @flow

import * as m from '../model';

import selectors from '.';

describe(`getSettingByKey`, (): void => {

  let dummyActiveSidebarIds: $PropertyType<m.UserSettingActiveSidebarIds, 'activeSidebarIds'>;
  let dummyUserSettings: m.UserSettings;

  beforeEach((): void => {
    dummyActiveSidebarIds = [m.sidebarIds.TOPIC_INFO, m.sidebarIds.SLIDE_PREVIEWS];
    dummyUserSettings = {
      activeSidebarIds: dummyActiveSidebarIds,
    };
  });

  it(`returns the setting matching the passed key`, (): void => {
    const dummyState: any = {
      modules: { platform: { settings: dummyUserSettings } },
    };
    expect(
      selectors.getSettingByKey(dummyState, { key: 'activeSidebarIds' }),
    ).toBe(dummyActiveSidebarIds);
  });

});
