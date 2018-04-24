// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiPostUsersAction } from '../../../actionTypes';
import signupSaga from '../signup';

describe(`signupEmail`, (): void => {
  it(`puts an apiPostUsers action`, (): void => {
    const dummyPostUsersAction: $Exact<ApiPostUsersAction> = {
      type: t.API_POST_USERS,
      payload: {
        email: 'foo',
        firstName: 'baz',
        lastName: 'bak',
        password: 'bar',
        tosAccepted: true,
      },
    };

    return expectSaga(signupSaga, dummyPostUsersAction)
      .put.like({ action: { type: t.API_POST_USERS } })
      .run();
  });
});
