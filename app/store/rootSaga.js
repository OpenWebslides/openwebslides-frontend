// @flow
/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { all, call } from 'redux-saga/effects';

import authenticationSaga from 'modules/authentication/saga';
import contentItemsSaga from 'modules/contentItems/saga';
import feedSaga from 'modules/feed/saga';
import historySaga from 'modules/history/saga';
import topicsSaga from 'modules/topics/saga';
import usersSaga from 'modules/users/saga';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    call(authenticationSaga),
    call(contentItemsSaga),
    call(feedSaga),
    call(historySaga),
    call(topicsSaga),
    call(usersSaga),
  ]);
};

export default rootSaga;
