// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';
import { pullRequestStates } from '../../model';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyToken: string;
  let dummyMessage: string;
  let dummyFeedback: string;
  let dummySourceTopicId: string;
  let dummyTargetTopicId: string;
  let dummyUserId: string;
  let dummyState: string;
  let dummyCreatedAt: number;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyToken = 'dummyToken';
    dummyMessage = 'dummyMessage';
    dummyFeedback = 'dummyFeedback';
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
            feedback: dummyFeedback,
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
        [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
        [call(api.pullRequests.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.pullRequests.get, dummyId, dummyToken)
      .put(actions.setMultipleInState([{ id: dummyId, message: dummyMessage, feedback: dummyFeedback, sourceTopicId: dummySourceTopicId, targetTopicId: dummyTargetTopicId, userId: dummyUserId, state: pullRequestStates.OPEN, timestamp: (dummyCreatedAt * 1000) }]))
      .run();
  });

  const states = {
    open: pullRequestStates.OPEN,
    pending: pullRequestStates.PENDING,
    incompatible: pullRequestStates.INCOMPATIBLE,
    working: pullRequestStates.WORKING,
    accepted: pullRequestStates.ACCEPTED,
    rejected: pullRequestStates.REJECTED,
  };

  Object.keys(states).forEach((state: any): void => {
    it(`sends a GET request for the passed id to the pullRequests endpoint, processes the response and puts the pull request in the state when the pull request state is ${state.toUpperCase()}`, (): void => {
      const dummyAction = actions.apiGet(dummyId);
      const dummyApiResponse = {
        status: 200,
        body: { data: {
          attributes: { message: dummyMessage, feedback: dummyFeedback, state },
          relationships: {
            source: { data: { id: dummySourceTopicId } },
            target: { data: { id: dummyTargetTopicId } },
            user: { data: { id: dummyUserId } } },
          meta: { createdAt: dummyCreatedAt } },
        },
      };

      return expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
          [call(api.pullRequests.get, dummyId, dummyToken), dummyApiResponse],
        ])
        .call(api.pullRequests.get, dummyId, dummyToken)
        .put(actions.setMultipleInState([{ id: dummyId, message: dummyMessage, feedback: dummyFeedback, sourceTopicId: dummySourceTopicId, targetTopicId: dummyTargetTopicId, userId: dummyUserId, state: states[state], timestamp: (dummyCreatedAt * 1000) }]))
        .run();
    });
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      data: {
        attributes: {
          message: dummyMessage,
          feedback: dummyFeedback,
          state: dummyState,
        },
        relationships: {
          source: { data: { id: dummySourceTopicId } },
          target: { data: { id: dummyTargetTopicId } },
          user: { data: { id: dummyUserId } },
        },
        meta: { createdAt: dummyCreatedAt },
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.pullRequests.get, dummyId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
          [call(api.pullRequests.get, dummyId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
