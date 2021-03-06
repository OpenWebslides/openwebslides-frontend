// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPostFork`, (): void => {

  let dummyId: string;
  let dummyForkedId: string;
  let dummyUserId: string;
  let dummyAccessToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyForkedId = 'dummyForkedId';
    dummyUserId = 'dummyUserId';
    dummyAccessToken = 'dummyAccessToken';
  });

  it(`sends a POST request for the passed id to the topics fork endpoint, processes the response and returns the forked topic ID`, (): void => {
    const dummyAction = actions.apiPostFork(dummyId);
    const dummyApiResponse = {
      status: 201,
      body: {
        data: {
          id: dummyForkedId,
        },
      },
    };

    return expectSaga(sagas.apiPostFork, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: dummyUserId, accessToken: dummyAccessToken }],
        [call(api.topics.postFork, dummyId, dummyAccessToken), dummyApiResponse],
      ])
      .call(api.topics.postFork, dummyId, dummyAccessToken)
      .returns({ id: dummyForkedId })
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPostFork(dummyId);
    const dummyApiResponse = { status: 201 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostFork, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.postFork, dummyId, dummyAccessToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPostFork(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostFork, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: dummyUserId, accessToken: dummyAccessToken }],
          [call(api.topics.postFork, dummyId, dummyAccessToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
