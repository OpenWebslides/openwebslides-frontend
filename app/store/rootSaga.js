// @flow

import { all, call } from 'redux-saga/effects';

import authentication from 'modules/authentication';
import contentItems from 'modules/contentItems';
import feed from 'modules/feed';
import history from 'modules/history';
import topics from 'modules/topics';
import users from 'modules/users';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    call(authentication.saga),
    call(contentItems.saga),
    call(feed.saga),
    call(history.saga),
    call(topics.saga),
    call(users.saga),
  ]);
};

export default rootSaga;
