// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyFeedItemData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { apiEventTypesToFeedItemTypesMap } from './apiGetAll';

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
            attributes: { eventType: _.findKey(apiEventTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem1.type) },
            relationships: {
              user: { data: { id: dummyFeedItem1.userId } },
              topic: { data: { id: dummyFeedItem1.topicId } },
            },
            meta: { createdAt: dummyFeedItem1.timestamp / 1000 },
          },
          {
            id: dummyFeedItem2.id,
            attributes: { eventType: _.findKey(apiEventTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem2.type) },
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

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiGetAll();
    const dummyApiResponse = {
      status: 200,
      body: {
        data: [
          {
            id: dummyFeedItem1.id,
            attributes: { eventType: _.findKey(apiEventTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem1.type) },
            relationships: {
              user: { data: { id: dummyFeedItem1.userId } },
              topic: { data: { id: dummyFeedItem1.topicId } },
            },
            meta: { createdAt: dummyFeedItem1.timestamp / 1000 },
          },
          {
            id: dummyFeedItem2.id,
            attributes: { eventType: _.findKey(apiEventTypesToFeedItemTypesMap, (feedItemType: string): boolean => feedItemType === dummyFeedItem2.type) },
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
      .put(asyncRequests.actions.setPending(a.API_GET_ALL))
      .put(asyncRequests.actions.setSuccess(a.API_GET_ALL))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGetAll();
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGetAll, dummyAction)
      .provide({
        call({ fn }: any, next: any): any {
          if (fn === api.feedItems.getAll) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_GET_ALL))
      .put(asyncRequests.actions.setFailure(a.API_GET_ALL, dummyError))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAll();
    const dummyApiResponse = {
      status: 200,
      body: null,
    };

    const result = await expectSaga(sagas.apiGetAll, dummyAction)
      .provide([
        [call(api.feedItems.getAll), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_GET_ALL))
      .put.actionType(asyncRequests.actions.setFailure(a.API_GET_ALL, new UnexpectedHttpResponseError()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
