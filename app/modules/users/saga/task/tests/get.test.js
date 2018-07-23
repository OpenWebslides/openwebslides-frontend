// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../../actionTypes';
import type { ApiGetUserAction } from '../../../actionTypes';
import getSaga from '../get';

describe(`get`, (): void => {
  it(`puts an apiGetUsers action`, (): void => {
    const dummyGetUsersAction: ApiGetUserAction = {
      type: a.API_GET_USER,
      payload: {
        id: 'foo',
      },
    };

    return expectSaga(getSaga, dummyGetUsersAction)
      .put.like({ action: { type: a.API_GET_USER } })
      .run();
  });
});
