// @flow

import { expectSaga } from 'redux-saga-test-plan';

import Api from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostUsersSaga } from '../users';

import AuthApi from '../../../api';

const { Response } = Api.model;

describe(`users`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    AuthApi.signup = (): Promise<Response> => {
      return Promise.resolve({
        body: {},
        token: null,
        status: 204,
      });
    };
  });

  describe(`apiPostUsersSaga`, (): void => {
    it(`calls AuthApi.signup`, (): void => {
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
        .call(AuthApi.signup, 'foo@bar', 'Foo', 'Bar', 'foobar', true)
        .run();
    });
  });
});
