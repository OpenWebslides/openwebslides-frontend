// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyToken: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyReturnedId';
    dummyToken = 'foobarToken';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
  });

  it(`dispatches a PATCH action to the topics endpoint, and returns the resulting topic ID`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.patch, dummyId, dummyTitle, dummyDescription, dummyToken)
      .returns({ id: dummyId })
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the request response doesn't contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription);
    const dummyApiResponse = { status: 200 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
          [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
