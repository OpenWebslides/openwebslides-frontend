// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPostToken`, (): void => {

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
    const dummyAction = actions.apiPostToken(dummyEmail, dummyPassword);
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

    return expectSaga(sagas.apiPostToken, dummyAction)
      .provide([
        [call(api.token.post, dummyEmail, dummyPassword), dummyApiResponse],
      ])
      .put(actions.setUserAuthInState({
        userId: dummyId,
        apiToken: dummyToken,
      }))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a token`, async (): Promise<void> => {
    const dummyAction = actions.apiPostToken(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: null,
      status: 201,
      token: dummyToken,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostToken, dummyAction)
        .provide([
          [call(api.token.post, dummyEmail, dummyPassword), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPostToken(dummyEmail, dummyPassword);
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
      expectSaga(sagas.apiPostToken, dummyAction)
        .provide([
          [call(api.token.post, dummyEmail, dummyPassword), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
