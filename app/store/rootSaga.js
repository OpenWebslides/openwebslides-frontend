// @flow

import { all, call } from 'redux-saga/effects';

import contentItems from 'modules/content-items';
import feedItems from 'modules/feed-items';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    call(contentItems.saga),
    call(feedItems.saga),
  ]);
};

export default rootSaga;
