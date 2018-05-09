// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { UsersApi } from 'lib/api';
import type { Response } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiGetUserSaga } from '../users';

describe(`users`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    UsersApi.get = (): Promise<Response> => {
      return Promise.resolve({
        body: {
          data: {
            attributes: {
              id: '0',
              email: 'foo@bar',
              firstName: 'Foo',
              lastName: 'Bar',
            },
          },
        },
        token: null,
        status: 200,
      });
    };
  });

  describe(`apiGetUsersSaga`, (): void => {
    it(`calls UsersApi.get`, (): void => {
      const dummyGetUsersAction: t.ApiGetUserAction = {
        type: t.API_GET_USER,
        payload: {
          id: '0',
        },
      };

      return expectSaga(apiGetUserSaga, dummyGetUsersAction)
        .call(UsersApi.get, '0')
        .run();
    });
  });
});
