// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apis from 'apis';

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
      .call(apis.password.post, 'foo@bar')
      .run();
  });
});
