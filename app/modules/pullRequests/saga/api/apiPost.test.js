// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPost`, (): void => {

  let dummyId: string;
  let dummyToken: string;
  let dummyMessage: string;
  let dummySourceTopicId: string;
  let dummyTargetTopicId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyToken = 'dummyToken';
    dummyMessage = 'dummyMessage';
    dummySourceTopicId = 'dummySourceTopicId';
    dummyTargetTopicId = 'dummyTargetTopicId';
    dummyUserId = 'dummyUserId';
  });

  it(`sends a POST request for the passed props to the pullRequests endpoint, and returns the resulting pull request identifier`, (): void => {
    const dummyAction = actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.pullRequests.post, dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .call(api.pullRequests.post, dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId, dummyToken)
      .returns({ id: dummyId })
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);
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
      expectSaga(sagas.apiPost, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.pullRequests.post, dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the request response doesn't contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);
    const dummyApiResponse = { status: 204 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPost, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
          [call(api.pullRequests.post, dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
