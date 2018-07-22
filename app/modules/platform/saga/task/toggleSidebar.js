// @flow

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

const toggleSidebar = function* (action: a.ToggleSidebarAction): Generator<*, *, *> {
  const { sidebarId } = action.payload;
  const activeSidebarIds = yield select(selectors.getSettingByKey, { key: 'activeSidebarIds' });
  let newActiveSidebarIds: $PropertyType<m.UserSettingActiveSidebarIds, 'activeSidebarIds'>;

  if (_.includes(activeSidebarIds, sidebarId)) {
    newActiveSidebarIds = _.without(activeSidebarIds, sidebarId);
  }
  else {
    newActiveSidebarIds = _.concat(activeSidebarIds, sidebarId);
  }

  yield put(actions.setSettingInState({ activeSidebarIds: newActiveSidebarIds }));
};

export default toggleSidebar;
