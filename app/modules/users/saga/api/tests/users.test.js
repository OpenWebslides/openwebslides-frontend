// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apis from 'lib/api';
import authentication from 'modules/authentication';

import * as t from '../../../actionTypes';
import { apiGetUserSaga } from '../users';

describe(`users`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();

    (authentication.selectors: any).getToken = (): string => {
      return 'foobarToken';
    };
  });

  describe(`apiGetUsersSaga`, (): void => {

    it(`calls UsersApi.get`, (): void => {
      const dummyData = {
        data: {
          id: '0',
          attributes: {
            firstName: 'Foo',
            lastName: 'Bar',
            email: 'foo@bar',
          },
        },
      };

      fetch.mockResponseOnce(JSON.stringify(dummyData), { status: 200 });

      const dummyGetUsersAction: t.ApiGetUserAction = {
        type: t.API_GET_USER,
        payload: {
          id: '0',
        },
      };

      return expectSaga(apiGetUserSaga, dummyGetUsersAction)
        .call(apis.users.get, '0', 'foobarToken')
        .put.like({ action: { type: t.ADD_TO_STATE } })
        .run();
    });

  });

});
