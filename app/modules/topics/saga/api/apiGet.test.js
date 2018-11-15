// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;
  let dummyRootContentId: string;
  let dummyUpstreamTopicId: string;
  let dummyForkedTopicId1: string;
  let dummyForkedTopicId2: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyUserId = 'dummyUserId';
    dummyRootContentId = 'dummyRootContentItemId';
    dummyUpstreamTopicId = 'dummyUpstreamTopicId';
    dummyForkedTopicId1 = 'dummyForkedTopicId1';
    dummyForkedTopicId2 = 'dummyForkedTopicId2';
    dummyToken = 'dummyToken';
  });

  it(`sends an unauthorized GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is no currently signed in user`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            rootContentItemId: dummyRootContentId,
          },
          relationships: {
            user: {
              data: {
                id: dummyUserId,
              },
            },
            upstream: {
              data: null,
            },
            forks: {
              data: [],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, userId: dummyUserId, rootContentItemId: dummyRootContentId, upstreamTopicId: null, forkedTopicIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends an authorized GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is a currently signed in user`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            rootContentItemId: dummyRootContentId,
          },
          relationships: {
            user: {
              data: {
                id: dummyUserId,
              },
            },
            upstream: {
              data: null,
            },
            forks: {
              data: [],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { apiToken: dummyToken }],
        [call(api.topics.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, dummyToken)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, userId: dummyUserId, rootContentItemId: dummyRootContentId, upstreamTopicId: null, forkedTopicIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is a upstream`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            rootContentItemId: dummyRootContentId,
          },
          relationships: {
            user: {
              data: {
                id: dummyUserId,
              },
            },
            upstream: {
              data: {
                id: dummyUpstreamTopicId,
              },
            },
            forks: {
              data: [],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, userId: dummyUserId, rootContentItemId: dummyRootContentId, upstreamTopicId: dummyUpstreamTopicId, forkedTopicIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there are forks`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            rootContentItemId: dummyRootContentId,
          },
          relationships: {
            user: {
              data: {
                id: dummyUserId,
              },
            },
            upstream: {
              data: null,
            },
            forks: {
              data: [
                { type: 'topics', id: dummyForkedTopicId1 },
                { type: 'topics', id: dummyForkedTopicId2 },
              ],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, userId: dummyUserId, rootContentItemId: dummyRootContentId, upstreamTopicId: null, forkedTopicIds: [dummyForkedTopicId1, dummyForkedTopicId2], isContentFetched: false, isDirty: false }]))
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
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.get, dummyId, null), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
