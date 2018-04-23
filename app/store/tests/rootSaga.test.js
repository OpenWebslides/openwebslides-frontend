// @flow

import { expectSaga } from 'redux-saga-test-plan';

import contentItems from 'modules/content-items';
import rootSaga from '../rootSaga';

describe(`rootSaga`, (): void => {

  it(`yields a call to contentItems.saga`, (): void => {
    return expectSaga(rootSaga)
      .call(contentItems.saga)
      .silentRun();
  });

});
