// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`toggleSidebar`, (): void => {

  it(`selects the activeSidebarIds from the state, adds the passed sidebarId to it and puts a setSettingInState action, when the passed sidebarId was not active`, (): void => {
    const dummyAction = actions.toggleSidebar(m.sidebarIds.TOPIC_INFO);

    return expectSaga(sagas.toggleSidebar, dummyAction)
      .provide([
        [select(selectors.getSettingByKey, { key: 'activeSidebarIds' }), [m.sidebarIds.SLIDE_PREVIEWS]],
      ])
      .put(actions.setSettingInState({ activeSidebarIds: [m.sidebarIds.SLIDE_PREVIEWS, m.sidebarIds.TOPIC_INFO] }))
      .run();
  });

  it(`selects the activeSidebarIds from the state, removes the passed sidebarId from it and puts a setSettingInState action, when the passed sidebarId was active`, (): void => {
    const dummyAction = actions.toggleSidebar(m.sidebarIds.TOPIC_INFO);

    return expectSaga(sagas.toggleSidebar, dummyAction)
      .provide([
        [select(selectors.getSettingByKey, { key: 'activeSidebarIds' }), [m.sidebarIds.TOPIC_INFO, m.sidebarIds.SLIDE_PREVIEWS]],
      ])
      .put(actions.setSettingInState({ activeSidebarIds: [m.sidebarIds.SLIDE_PREVIEWS] }))
      .run();
  });

});
