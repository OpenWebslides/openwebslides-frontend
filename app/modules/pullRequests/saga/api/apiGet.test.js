// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';

import actions from '../../actions';
import { pullRequestStates } from '../../model';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyMessage: string;
  let dummySourceTopicId: string;
  let dummyTargetTopicId: string;
  let dummyUserId: string;
  let dummyState: string;
  let dummyCreatedAt: number;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyMessage = 'dummyMessage';
    dummySourceTopicId = 'dummySourceTopicId';
    dummyTargetTopicId = 'dummyTargetTopicId';
    dummyUserId = 'dummyUserId';
    dummyState = 'open';
    dummyCreatedAt = 1540308640;
  });

  it(`sends a GET request for the passed id to the pullRequests endpoint, processes the response and puts the pull request in the state`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            message: dummyMessage,
            state: dummyState,
          },
          relationships: {
            source: { data: { id: dummySourceTopicId } },
            target: { data: { id: dummyTargetTopicId } },
            user: { data: { id: dummyUserId } },
          },
          meta: { createdAt: dummyCreatedAt },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.pullRequests.get, dummyId), dummyApiResponse],
      ])
      .call(api.pullRequests.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, message: dummyMessage, sourceTopicId: dummySourceTopicId, targetTopicId: dummyTargetTopicId, userId: dummyUserId, state: pullRequestStates.OPEN, timestamp: (dummyCreatedAt * 1000) }]))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [call(api.pullRequests.get, dummyId), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
