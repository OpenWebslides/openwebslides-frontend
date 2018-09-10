// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiGetAllByTopicId`, (): void => {

  let dummyTopicId: string;
  let dummyContentItems: $ReadOnlyArray<m.ContentItem>;

  beforeEach((): void => {
    dummyTopicId = 'dummyTopicId';
    dummyContentItems = [
      { ...dummyData.rootContentItem },
      // $FlowFixMe couldn't decide which case to select; probable bug
      { ...dummyData.headingContentItem },
      // $FlowFixMe couldn't decide which case to select; probable bug
      { ...dummyData.paragraphContentItem },
    ];
  });

  it(`sends a GET request for the topic content to the topics endpoint, processes the response and sets the contentItems in the state`, (): void => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            content: dummyContentItems,
          },
        },
      },
    };

    return expectSaga(sagas.apiGetAllByTopicId, dummyAction)
      .provide([
        [call(api.topics.getContent, dummyTopicId), dummyApiResponse],
      ])
      .call(api.topics.getContent, dummyTopicId)
      .put(actions.setMultipleInState(dummyContentItems))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyApiResponse = { status: 200 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGetAllByTopicId, dummyAction)
        .provide([
          [call(api.topics.getContent, dummyTopicId), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
