// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyFeedItemData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import { apiFeedItemTypesToFeedItemTypesMap } from './apiGetAll';

import { sagas } from '..';

describe(`apiGetAll`, (): void => {

  let dummyFeedItem1: m.FeedItem;
  let dummyFeedItem2: m.FeedItem;

  beforeEach((): void => {
    dummyFeedItem1 = { ...dummyFeedItemData.feedItem };
    dummyFeedItem2 = { ...dummyFeedItemData.feedItem2 };
  });

  it(`sends a GET request to the feedItems endpoint, processes the response and puts the feedItems in the state`, (): void => {
    const dummyAction = actions.apiGetAll();
    const dummyApiResponse = {
      status: 200,
      body: {
        data: [
          {
            id: dummyFeedItem1.id,
            attributes: { feedItemType: _.findKey(apiFeedItemTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem1.type) },
            relationships: {
              user: { data: { id: dummyFeedItem1.userId } },
              topic: { data: { id: dummyFeedItem1.topicId } },
            },
            meta: { createdAt: dummyFeedItem1.timestamp / 1000 },
          },
          {
            id: dummyFeedItem2.id,
            attributes: { feedItemType: _.findKey(apiFeedItemTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem2.type) },
            relationships: {
              user: { data: { id: dummyFeedItem2.userId } },
              topic: { data: { id: dummyFeedItem2.topicId } },
            },
            meta: { createdAt: dummyFeedItem2.timestamp / 1000 },
          },
        ],
      },
    };

    return expectSaga(sagas.apiGetAll, dummyAction)
      .provide([
        [call(api.feedItems.getAll), dummyApiResponse],
      ])
      .put(actions.setMultipleInState([dummyFeedItem1, dummyFeedItem2]))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiGetAll();
    const dummyApiResponse = {
      status: 200,
      body: null,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGetAll, dummyAction)
        .provide([
          [call(api.feedItems.getAll), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
