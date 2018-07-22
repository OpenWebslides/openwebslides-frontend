// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`toggleSidebar`, (): void => {

  it(`returns a platform TOGGLE_SIDEBAR action containing the passed props`, (): void => {
    const dummySidebarId = m.sidebarIds.TOPIC_INFO;
    const expectedAction: a.ToggleSidebarAction = {
      type: a.TOGGLE_SIDEBAR,
      payload: {
        sidebarId: dummySidebarId,
      },
    };
    const actualAction = actions.toggleSidebar(dummySidebarId);
    expect(actualAction).toEqual(expectedAction);
  });

});
