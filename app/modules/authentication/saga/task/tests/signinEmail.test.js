// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiPostTokenAction } from '../../../actionTypes';
import signinEmailSaga from '../signinEmail';

describe(`signinEmail`, (): void => {
  it(`puts an apiPostToken action`, (): void => {
    const dummyPostTokenAction: ApiPostTokenAction = {
      type: t.API_POST_TOKEN,
      payload: {
        email: 'foo',
        password: 'bar',
      },
    };

    return expectSaga(signinEmailSaga, dummyPostTokenAction)
      .put.like({ action: { type: t.API_POST_TOKEN } })
      .run();
  });
});
