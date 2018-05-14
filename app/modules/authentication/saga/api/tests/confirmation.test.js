// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { ConfirmationApi } from 'lib/api';
import type { Response } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostConfirmationSaga } from '../confirmation';

describe(`confirmation`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    ConfirmationApi.post = (): Promise<Response> => {
      return Promise.resolve({
        body: {},
        token: null,
        status: 204,
      });
    };
  });

  it(`calls ConfirmationApi.confirm`, (): void => {
    const dummyPostConfirmationAction: t.ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostConfirmationSaga, dummyPostConfirmationAction)
      .call(ConfirmationApi.post, 'foo@bar')
      .run();
  });
});
