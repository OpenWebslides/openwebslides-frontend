// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { UsersApi } from 'lib/api';
import type { Response } from 'lib/api';

import * as selectors from 'modules/authentication/selectors';

import * as t from '../../../actionTypes';
import { apiGetUserSaga } from '../users';

describe(`users`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    UsersApi.get = (): Promise<Response> => {
      return Promise.resolve({
        body: {
          data: {
            id: '0',
            attributes: {
              firstName: 'Foo',
              lastName: 'Bar',
              email: 'foo@bar',
            },
          },
        },
        token: 'foobartoken',
        status: 200,
      });
    };

    // $FlowFixMe
    selectors.getToken = (): string => {
      return 'foobartoken';
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
        .call(UsersApi.get, '0', 'foobartoken')
        .put.like({ action: { type: t.ADD_TO_STATE } })
        .run();
    });
  });
});
