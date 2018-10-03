// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyRootContentId: string;
  let dummyUpstreamTopicId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyRootContentId = 'dummyRootContentItemId';
    dummyUpstreamTopicId = 'dummyUpstreamTopicId';
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state`, (): void => {
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
            upstream: {
              data: null,
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyRootContentId, upstreamTopicId: null, isContentFetched: false }]))
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
            upstream: {
              data: {
                id: dummyUpstreamTopicId,
              },
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyRootContentId, upstreamTopicId: dummyUpstreamTopicId, isContentFetched: false }]))
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
          [call(api.topics.get, dummyId), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
