// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiPostPasswordAction } from '../../../actionTypes';
import resetSaga from '../reset';

describe(`reset`, (): void => {
  it(`puts an apiPostPassword action`, (): void => {
    const dummyPostPasswordAction: $Exact<ApiPostPasswordAction> = {
      type: t.API_POST_PASSWORD,
      payload: {
        email: 'foo',
      },
    };

    return expectSaga(resetSaga, dummyPostPasswordAction)
      .put.like({ action: { type: t.API_POST_PASSWORD } })
      .run();
  });
});
