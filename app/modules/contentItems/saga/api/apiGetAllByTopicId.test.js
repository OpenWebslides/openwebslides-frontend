// @flow

import _ from 'lodash';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnsupportedOperationError, UnexpectedHttpResponseError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiGetAllByTopicId`, (): void => {

  let dummyToken: string;
  let dummyTopicId: string;
  let dummyContentItems: $ReadOnlyArray<m.ContentItem>;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
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
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.getContent, dummyTopicId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.getContent, dummyTopicId, dummyToken)
      .put(actions.setMultipleInState(dummyContentItems))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
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
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.getContent, dummyTopicId, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put(apiRequestsStatus.actions.setSuccess(a.API_GET_ALL_BY_TOPIC_ID))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGetAllByTopicId, dummyAction)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.topics.getContent) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put(apiRequestsStatus.actions.setFailure(a.API_GET_ALL_BY_TOPIC_ID, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when there is no currently signed in user`, async (): Promise<mixed> => {
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

    const result = await expectSaga(sagas.apiGetAllByTopicId, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.getContent, dummyTopicId, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET_ALL_BY_TOPIC_ID, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnsupportedOperationError);
  });

  it(`sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyApiResponse = { status: 200 };

    const result = await expectSaga(sagas.apiGetAllByTopicId, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.getContent, dummyTopicId, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET_ALL_BY_TOPIC_ID, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
