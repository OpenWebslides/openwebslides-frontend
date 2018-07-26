// @flow

/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { expectSaga } from 'redux-saga-test-plan';

import contentItemsSaga from 'modules/contentItems/saga';

import rootSaga from './rootSaga';

describe(`rootSaga`, (): void => {

  // #TODO
  it(`yields a call to contentItems.saga`, (): void => {
    return expectSaga(rootSaga)
      .call(contentItemsSaga)
      .silentRun();
  });

});
