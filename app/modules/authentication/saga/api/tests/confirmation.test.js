// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import { apiPostConfirmationSaga } from '../confirmation';
import Api from '../../../api';

describe(`confirmation`, (): void => {
  it(`calls Api.confirm`, (): void => {
    const dummyPostConfirmationAction: t.ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostConfirmationSaga, dummyPostConfirmationAction)
      .call(Api.confirm, 'foo@bar')
      .run();
  });
});
