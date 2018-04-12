// @flow
/**
 * Sets up the root saga.
 */

import { all, call } from 'redux-saga/effects';

import contentItems from 'modules/content-items';

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    call(contentItems.saga),
  ]);
};

export default rootSaga;
