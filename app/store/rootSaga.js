// @flow

import { apiSagas } from 'modules/api';
import contentItems from 'modules/content-items';

/**
 * Sets up the root saga.
 */

import { all, call } from 'redux-saga/effects';

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    ...apiSagas,
    call(contentItems.saga),
  ]);
};

export default rootSaga;
