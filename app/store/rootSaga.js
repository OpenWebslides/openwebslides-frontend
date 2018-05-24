// @flow

import { all, call } from 'redux-saga/effects';

import contentItems from 'modules/content-items';
import feed from 'modules/feed';
import authentication from 'modules/authentication';
import topics from 'modules/topics';
import users from 'modules/users';
import history from 'modules/history';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    call(contentItems.saga),
    call(feed.saga),
    call(authentication.saga),
    call(topics.saga),
    call(users.saga),
    call(history.saga),
  ]);
};

export default rootSaga;
