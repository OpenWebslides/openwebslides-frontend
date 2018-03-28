// @flow

import { all, call } from 'redux-saga/effects';

import api from 'modules/api';
import contentItems from 'modules/content-items';

/**
 * Sets up the root saga.
 */

const rootSaga = function* (): Generator<*, *, *> {
  yield all([
    ...api.sagas,
    call(contentItems.saga),
  ]);
};

export default rootSaga;
