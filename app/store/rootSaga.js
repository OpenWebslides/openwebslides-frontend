// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';
import feedItems from 'modules/feedItems';
import platform from 'modules/platform';
import topics from 'modules/topics';
import users from 'modules/users';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Saga<void> {
  yield all([
    call(asyncRequests.saga),
    call(contentItems.saga),
    call(feedItems.saga),
    call(platform.saga),
    call(topics.saga),
    call(users.saga),
  ]);
};

export default rootSaga;
