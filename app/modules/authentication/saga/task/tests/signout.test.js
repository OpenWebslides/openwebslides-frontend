// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiDeleteTokenAction } from '../../../actionTypes';
import signoutSaga from '../signout';

describe(`signout`, (): void => {
  it(`puts an apiDeleteToken action`, (): void => {
    const dummyDeleteTokenAction: $Exact<ApiDeleteTokenAction> = {
      type: t.API_DELETE_TOKEN,
    };

    return expectSaga(signoutSaga, dummyDeleteTokenAction)
      .put.like({ action: { type: t.API_DELETE_TOKEN } })
      .run();
  });
});
