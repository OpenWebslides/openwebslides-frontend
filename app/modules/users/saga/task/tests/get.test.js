// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../../actionTypes';
import type { ApiGetUsersAction } from '../../../actionTypes';
import getSaga from '../get';

describe(`get`, (): void => {
  it(`puts an apiGetUsers action`, (): void => {
    const dummyGetUsersAction: ApiGetUsersAction = {
      type: t.API_GET_USERS,
      payload: {
        id: 'foo',
      },
    };

    return expectSaga(getSaga, dummyGetUsersAction)
      .put.like({ action: { type: t.API_GET_USERS } })
      .run();
  });
});
