// @flow

import { expectSaga } from 'redux-saga-test-plan';

import Api from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostTokenSaga, apiDeleteTokenSaga } from '../token';

import AuthApi from '../../../api';
import * as selectors from '../../../selectors';

const { Response } = Api.model;

describe(`token`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    AuthApi.signinEmail = (): Promise<Response> => {
      return Promise.resolve({
        body: {
          data: {
            attributes: {
              id: 0,
              email: 'foo@bar',
              firstName: 'Foo',
              lastName: 'Bar',
            },
          },
        },
        token: 'foobartoken',
        status: 204,
      });
    };

    AuthApi.signout = (): Promise<Response> => {
      return Promise.resolve({
        body: {},
        token: null,
        status: 204,
      });
    };

    selectors.getToken = (): string => {
      return 'foobartoken';
    };
  });

  describe(`apiPostTokenSaga`, (): void => {
    it(`calls AuthApi.signinEmail and puts two actions`, (): void => {
      const dummyPostTokenAction: t.ApiPostTokenAction = {
        type: t.API_POST_TOKEN,
        payload: {
          email: 'foo@bar',
          password: 'foobar',
        },
      };

      return expectSaga(apiPostTokenSaga, dummyPostTokenAction)
        .call(AuthApi.signinEmail, 'foo@bar', 'foobar')
        .put.like({ action: { type: t.SET_ACCOUNT } })
        .put.like({ action: { type: t.SET_TOKEN } })
        .run();
    });
  });

  describe(`apiDeleteTokenSaga`, (): void => {
    it(`calls AuthApi.signout and puts two actions`, (): void => {
      const dummyDeleteTokenAction: t.ApiDeleteTokenAction = {
        type: t.API_DELETE_TOKEN,
        payload: {
          email: 'foo@bar',
          password: 'foobar',
        },
      };

      return expectSaga(apiDeleteTokenSaga, dummyDeleteTokenAction)
        .call(AuthApi.signout, 'foobartoken')
        .put.like({ action: { type: t.SET_ACCOUNT } })
        .put.like({ action: { type: t.SET_TOKEN } })
        .run();
    });
  });
});
