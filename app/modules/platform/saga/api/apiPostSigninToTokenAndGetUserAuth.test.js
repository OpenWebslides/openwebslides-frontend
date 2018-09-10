// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostSigninToTokenAndGetUserAuth`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyEmail: string;
  let dummyPassword: string;
  let dummyGravatarHash: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyName = 'Test Tester';
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';
    dummyGravatarHash = 'abcdefghij';
    dummyToken = 'foobarToken';
  });

  it(`posts the passed email and password to the token API endpoint, processes the response and puts the userAuth object in the state`, (): void => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: {
        data: {
          id: dummyId,
          attributes: {
            name: dummyName,
            gravatarHash: dummyGravatarHash,
          },
        },
      },
      status: 201,
      token: dummyToken,
    };

    return expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
      .provide([
        [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
      ])
      .put(actions.setUserAuthInState({
        userId: dummyId,
        apiToken: dummyToken,
      }))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a token`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: null,
      status: 201,
      token: dummyToken,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
        .provide([
          [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
        ])
        .put.actionType(asyncRequests.actions.setFailure(a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, new UnexpectedHttpResponseError()).type)
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: {
        data: {
          id: dummyId,
          attributes: {
            name: dummyName,
            gravatarHash: dummyGravatarHash,
          },
        },
      },
      status: 201,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
        .provide([
          [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
