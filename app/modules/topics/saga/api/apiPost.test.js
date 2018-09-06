// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiPost`, (): void => {

  let dummyId: string;
  let dummyToken: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyRootContentItemId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyId = 'dummyReturnedId';
    dummyToken = 'foobarToken';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyRootContentItemId = 'dummyRootContentItemId';
    dummyUserId = 'dummyUserId';
  });

  it(`sends a POST request for the passed props to the topics endpoint`, (): void => {
    const dummyAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.post, dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.post, dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.post, dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_POST))
      .put(asyncRequests.actions.setSuccess(a.API_POST, { id: dummyId }))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPost, dummyAction)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.topics.post) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_POST))
      .put(asyncRequests.actions.setFailure(a.API_POST, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when there is no currently signed in user`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    const result = await expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.post, dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_POST))
      .put.actionType(asyncRequests.actions.setFailure(a.API_POST, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnsupportedOperationError);
  });

  it(`sets its request status to FAILURE, when the request response doesn't contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPost(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId);
    const dummyApiResponse = { status: 204 };

    const result = await expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.post, dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_POST))
      .put.actionType(asyncRequests.actions.setFailure(a.API_POST, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
