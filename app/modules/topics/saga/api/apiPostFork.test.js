// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPostFork`, (): void => {

  let dummyId: string;
  let dummyForkedId: string;
  let dummyToken: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyRootContentId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyForkedId = 'dummyForkedId';
    dummyToken = 'dummyToken';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyRootContentId = 'dummyRootContentItemId';
  });

  it(`sends a POST request for the passed id to the topics fork endpoint, processes the response and puts the forked topic in the state`, (): void => {
    const dummyAction = actions.apiPostFork(dummyId);
    const dummyApiResponse = {
      status: 201,
      body: {
        data: {
          id: dummyForkedId,
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            rootContentItemId: dummyRootContentId,
          },
          relationships: {
            upstream: {
              data: { type: 'topics', id: dummyId },
            },
            forks: {
              data: [],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiPostFork, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.postFork, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.postFork, dummyId, dummyToken)
      .put(actions.setMultipleInState([{ id: dummyForkedId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyRootContentId, upstreamTopicId: dummyId, forkedTopicIds: [], isContentFetched: false }]))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPostFork(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPostFork, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
          [call(api.topics.postFork, dummyId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
