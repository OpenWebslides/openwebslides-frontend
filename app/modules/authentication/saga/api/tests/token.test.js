// @flow

import { expectSaga } from 'redux-saga-test-plan';

import { AuthenticationApi } from 'lib/api';
import type { Response } from 'lib/api';

import * as t from '../../../actionTypes';
import { apiPostTokenSaga, apiDeleteTokenSaga } from '../token';

import * as selectors from '../../../selectors';

describe(`token`, (): void => {
  beforeAll((): void => {
    // Mock API calls
    AuthenticationApi.signinEmail = (): Promise<Response> => {
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

    AuthenticationApi.signout = (): Promise<Response> => {
      return Promise.resolve({
        body: {},
        token: null,
        status: 204,
      });
    };

    // $FlowFixMe
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
        .call(AuthenticationApi.signinEmail, 'foo@bar', 'foobar')
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
        .call(AuthenticationApi.signout, 'foobartoken')
        .put.like({ action: { type: t.SET_ACCOUNT } })
        .put.like({ action: { type: t.SET_TOKEN } })
        .run();
    });
  });
});
