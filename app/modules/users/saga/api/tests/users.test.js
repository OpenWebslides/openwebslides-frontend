// @flow

import { expectSaga } from 'redux-saga-test-plan';

import Api from 'lib/api';

import * as t from '../../../actionTypes';
import { apiGetUsersSaga } from '../users';

import UsersApi from '../../../api';

const { Response } = Api.model;

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
      const dummyGetUsersAction: t.ApiGetUsersAction = {
        type: t.API_GET_USERS,
        payload: {
          id: '0',
        },
      };

      return expectSaga(apiGetUsersSaga, dummyGetUsersAction)
        .call(UsersApi.get, '0')
        .run();
    });
  });
});
