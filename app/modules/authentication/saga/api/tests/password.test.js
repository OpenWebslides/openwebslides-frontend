// @flow

import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import * as t from '../../../actionTypes';
import { apiPostPasswordSaga } from '../password';

describe(`reset`, (): void => {
  it(`calls Api.reset`, (): void => {
    const dummyPostPasswordAction: t.ApiPostPasswordAction = {
      type: t.API_POST_PASSWORD,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostPasswordSaga, dummyPostPasswordAction)
      .call(api.password.post, 'foo@bar')
      .run();
  });
});
