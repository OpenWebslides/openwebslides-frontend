// @flow

import _ from 'lodash';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';
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
        [call(api.topics.getContent, dummyTopicId), dummyApiResponse],
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
        call({ fn }: any, next: any): any {
          if (fn === api.topics.getContent) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put(apiRequestsStatus.actions.setFailure(a.API_GET_ALL_BY_TOPIC_ID, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAllByTopicId(dummyTopicId);
    const dummyApiResponse = { status: 200 };

    const result = await expectSaga(sagas.apiGetAllByTopicId, dummyAction)
      .provide([
        [call(api.topics.getContent, dummyTopicId), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET_ALL_BY_TOPIC_ID))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET_ALL_BY_TOPIC_ID, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
