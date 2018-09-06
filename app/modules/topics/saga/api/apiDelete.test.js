// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiDelete`, (): void => {

  let dummyId: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyToken = 'foobarToken';
  });

  it(`sends a DELETE request for the passed id to the topics endpoint`, (): void => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiDelete, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.delete, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.delete, dummyId, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiDelete, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.delete, dummyId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_DELETE))
      .put(asyncRequests.actions.setSuccess(a.API_DELETE))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiDelete, dummyAction)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.topics.delete) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_DELETE))
      .put(asyncRequests.actions.setFailure(a.API_DELETE, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when there is no currently signed in user`, async (): Promise<mixed> => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyApiResponse = { status: 204 };

    const result = await expectSaga(sagas.apiDelete, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.delete, dummyId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_DELETE))
      .put.actionType(asyncRequests.actions.setFailure(a.API_DELETE, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnsupportedOperationError);
  });

});
