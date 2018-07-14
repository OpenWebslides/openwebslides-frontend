// @flow

import { expectSaga } from 'redux-saga-test-plan';

import apis from 'apis';

import * as t from '../../../actionTypes';
import { apiPostTokenSaga, apiDeleteTokenSaga } from '../token';
import * as selectors from '../../../selectors';

describe(`token`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();

    (selectors: any).getToken = (): string => {
      return 'foobarToken';
    };
  });

  describe(`apiPostTokenSaga`, (): void => {

    it(`calls AuthApi.signinEmail and puts two actions`, (): void => {
      const dummyData = {
        data: {
          attributes: {
            id: 0,
            email: 'foo@bar',
            firstName: 'Foo',
            lastName: 'Bar',
          },
        },
      };

      // #TODO isn't status supposed to be 200? @Florian
      fetch.mockResponseOnce(JSON.stringify(dummyData), { status: 204 });

      const dummyPostTokenAction: t.ApiPostTokenAction = {
        type: t.API_POST_TOKEN,
        payload: {
          email: 'foo@bar',
          password: 'foobar',
        },
      };

      return expectSaga(apiPostTokenSaga, dummyPostTokenAction)
        .call(apis.token.post, 'foo@bar', 'foobar')
        .put.like({ action: { type: t.SET_ACCOUNT } })
        .put.like({ action: { type: t.SET_TOKEN } })
        .run();
    });

  });

  describe(`apiDeleteTokenSaga`, (): void => {

    it(`calls AuthApi.signout and puts two actions`, (): void => {
      fetch.mockResponseOnce(null, { status: 204 });

      const dummyDeleteTokenAction: t.ApiDeleteTokenAction = {
        type: t.API_DELETE_TOKEN,
        payload: {
          email: 'foo@bar',
          password: 'foobar',
        },
      };

      return expectSaga(apiDeleteTokenSaga, dummyDeleteTokenAction)
        .call(apis.token.destroy, 'foobarToken')
        .put.like({ action: { type: t.SET_ACCOUNT } })
        .put.like({ action: { type: t.SET_TOKEN } })
        .run();
    });

  });
});
