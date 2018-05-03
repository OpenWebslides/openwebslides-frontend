// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { AuthenticationApi } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostConfirmationSaga } from '../confirmation';

describe(`confirmation`, (): void => {
  it(`calls Api.confirm`, (): void => {
    const dummyPostConfirmationAction: t.ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostConfirmationSaga, dummyPostConfirmationAction)
      .call(AuthenticationApi.confirm, 'foo@bar')
      .run();
  });
});
