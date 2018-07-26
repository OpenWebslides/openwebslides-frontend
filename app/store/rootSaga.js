// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import apiRequestsStatusSaga from 'modules/apiRequestsStatus/saga';
import contentItemsSaga from 'modules/contentItems/saga';
import feedSaga from 'modules/feed/saga';
import platformSaga from 'modules/platform/saga';
import topicsSaga from 'modules/topics/saga';
import usersSaga from 'modules/users/saga';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Saga<void> {
  yield all([
    call(apiRequestsStatusSaga),
    call(contentItemsSaga),
    call(feedSaga),
    call(platformSaga),
    call(topicsSaga),
    call(usersSaga),
  ]);
};

export default rootSaga;
