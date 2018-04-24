// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import { apiPostPasswordSaga } from '../password';
import Api from '../../../api';

describe(`reset`, (): void => {
  it(`calls Api.reset`, (): void => {
    const dummyPostPasswordAction: t.ApiPostPasswordAction = {
      type: t.API_POST_PASSWORD,
      payload: {
        email: 'foo@bar',
      },
    };

    return expectSaga(apiPostPasswordSaga, dummyPostPasswordAction)
      .call(Api.reset, 'foo@bar')
      .run();
  });
});
