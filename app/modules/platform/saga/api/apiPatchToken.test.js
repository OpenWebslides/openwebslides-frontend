// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatchToken`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyEmail: string;
  let dummyGravatarHash: string;
  let dummyRefreshToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyName = 'Test Tester';
    dummyEmail = 'test@test.be';
    dummyGravatarHash = 'abcdefghij';
    dummyRefreshToken = 'dummyRefreshToken';
  });

  it(`patchs the passed email and password to the token API endpoint, processes the response and puts the userAuth object in the state`, (): void => {
    const dummyAction = actions.apiPatchToken(dummyEmail, dummyRefreshToken);
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
      token: dummyRefreshToken,
    };

    return expectSaga(sagas.apiPatchToken, dummyAction)
      .provide([
        [call(api.token.patch, dummyEmail, dummyRefreshToken), dummyApiResponse],
      ])
      .put(actions.setUserAuthInState({
        userId: dummyId,
        refreshToken: dummyRefreshToken,
        accessToken: null,
      }))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a token`, async (): Promise<void> => {
    const dummyAction = actions.apiPatchToken(dummyEmail, dummyRefreshToken);
    const dummyApiResponse = {
      body: null,
      status: 201,
      token: dummyRefreshToken,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatchToken, dummyAction)
        .provide([
          [call(api.token.patch, dummyEmail, dummyRefreshToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPatchToken(dummyEmail, dummyRefreshToken);
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
      expectSaga(sagas.apiPatchToken, dummyAction)
        .provide([
          [call(api.token.patch, dummyEmail, dummyRefreshToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
