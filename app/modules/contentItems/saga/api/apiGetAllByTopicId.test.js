// @flow

import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiGetAllByTopicId`, (): void => {

  let dummyTopicId: string;
  let dummyContentItems: $ReadOnlyArray<m.ContentItem>;
  let dummyAccessToken: string;

  beforeEach((): void => {
    dummyTopicId = 'dummyTopicId';
    dummyContentItems = [
      { ...dummyData.rootContentItem },
      // $FlowFixMe couldn't decide which case to select; probable bug
      { ...dummyData.headingContentItem },
      // $FlowFixMe couldn't decide which case to select; probable bug
      { ...dummyData.paragraphContentItem },
    ];
    dummyAccessToken = 'dummyAccessToken';
  });

  it(`sends a GET request for the topic content to the topics endpoint, processes the response and sets the contentItems in the state when there is no currently signed in user`, (): void => {
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
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.getContent, dummyTopicId, null), dummyApiResponse],
      ])
      .call(api.topics.getContent, dummyTopicId, null)
      .put(actions.setMultipleInState(dummyContentItems))
      .run();
  });

  it(`sends a GET request for the topic content to the topics endpoint, processes the response and sets the contentItems in the state when there is a currently signed in user`, (): void => {
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
        [select(platform.selectors.getUserAuth), { accessToken: dummyAccessToken }],
        [call(api.topics.getContent, dummyTopicId, dummyAccessToken), dummyApiResponse],
      ])
      .call(api.topics.getContent, dummyTopicId, dummyAccessToken)
      .put(actions.setMultipleInState(dummyContentItems))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyApiResponse = { status: 200 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGetAllByTopicId, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.getContent, dummyTopicId, null), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
