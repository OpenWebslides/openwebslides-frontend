// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiPostConfirmationAction } from '../../../actionTypes';
import resetSaga from '../reset';

describe(`confirm`, (): void => {
  it(`puts an apiPostConfirmation action`, (): void => {
    const dummyPostConfirmationAction: $Exact<ApiPostConfirmationAction> = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo',
      },
    };

    return expectSaga(resetSaga, dummyPostConfirmationAction)
      .put.like({ action: { type: t.API_POST_PASSWORD } })
      .run();
  });
});
