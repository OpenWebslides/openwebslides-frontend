// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyRootContentId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyRootContentId = 'dummyRootContentItemId';
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
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyRootContentId, isContentFetched: false }]))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
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
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setSuccess(a.API_GET))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGet, dummyAction)
      .provide({
        call({ fn }: any, next: any): any {
          if (fn === api.topics.get) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setFailure(a.API_GET, dummyError))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    const result = await expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET, new UnexpectedHttpResponseError()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
