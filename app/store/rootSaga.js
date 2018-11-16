// @flow

/* eslint-disable sort-imports */

import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import alerts from 'modules/alerts';
import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';
import errors from 'modules/errors';
import feedItems from 'modules/feedItems';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';
import users from 'modules/users';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Saga<void> {
  yield all([
    call(alerts.saga),
    call(asyncRequests.saga),
    call(contentItems.saga),
    call(errors.saga),
    call(feedItems.saga),
    call(platform.saga),
    call(pullRequests.saga),
    call(topics.saga),
    call(users.saga),
  ]);
};

export default rootSaga;
