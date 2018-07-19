// @flow

import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import platform from 'modules/platform';

import * as t from '../../../actionTypes';
import { apiGetUserSaga, apiPostUserSaga } from '../users';

describe(`users`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();

    (platform.selectors: any).getUserAuth = (): platform.model.UserAuth => {
      return {
        userId: 'dummyUserId',
        apiToken: 'foobarToken',
      };
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
        .call(api.users.get, '0', 'foobarToken')
        .put.like({ action: { type: t.ADD_TO_STATE } })
        .run();
    });

  });

  describe(`apiPostUserSaga`, (): void => {

    it(`calls AuthApi.signup`, (): void => {
      fetch.mockResponseOnce(null, { status: 204 });

      const dummyPostUsersAction: t.ApiPostUserAction = {
        type: t.API_POST_USER,
        payload: {
          email: 'foo@bar',
          firstName: 'Foo',
          lastName: 'Bar',
          password: 'foobar',
          tosAccepted: true,
        },
      };

      return expectSaga(apiPostUserSaga, dummyPostUsersAction)
        .call(api.users.post, 'foo@bar', 'Foo', 'Bar', 'foobar', true)
        .run();
    });

  });

});
