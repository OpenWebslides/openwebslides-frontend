// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiPostConfirmationAction } from '../../../actionTypes';
import confirmSaga from '../confirm';

describe(`confirm`, (): void => {
  it(`puts an apiPostConfirmation action`, (): void => {
    const dummyPostConfirmationAction: ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo',
      },
    };

    return expectSaga(confirmSaga, dummyPostConfirmationAction)
      .put.like({ action: { type: t.API_POST_CONFIRMATION } })
      .run();
  });
});
