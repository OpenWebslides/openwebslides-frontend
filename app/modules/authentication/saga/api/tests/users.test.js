// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { UsersApi } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostUsersSaga } from '../users';

describe(`users`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  describe(`apiPostUsersSaga`, (): void => {

    it(`calls AuthApi.signup`, (): void => {
      fetch.mockResponseOnce(null, { status: 204 });

      const dummyPostUsersAction: t.ApiPostUsersAction = {
        type: t.API_POST_USERS,
        payload: {
          email: 'foo@bar',
          firstName: 'Foo',
          lastName: 'Bar',
          password: 'foobar',
          tosAccepted: true,
        },
      };

      return expectSaga(apiPostUsersSaga, dummyPostUsersAction)
        .call(UsersApi.post, 'foo@bar', 'Foo', 'Bar', 'foobar', true)
        .run();
    });

  });

});
