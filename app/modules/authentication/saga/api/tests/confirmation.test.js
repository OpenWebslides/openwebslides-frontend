// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apis from 'apis';

import * as t from '../../../actionTypes';
import { apiPostConfirmationSaga } from '../confirmation';

describe(`confirmation`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`calls ConfirmationApi.confirm`, (): void => {
    fetch.mockResponseOnce(null, { status: 204 });

    const dummyPostConfirmationAction: t.ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostConfirmationSaga, dummyPostConfirmationAction)
      .call(apis.confirmation.post, 'foo@bar')
      .run();
  });

});
