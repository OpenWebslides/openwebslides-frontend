// @flow

import _ from 'lodash';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyName: string;
  let dummyGravatarHash: string;
  let dummyToken: string;
  let dummyTopicId1: string;
  let dummyTopicId2: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyGravatarHash = 'test';
    dummyToken = 'foobarToken';
    dummyTopicId1 = 'dummyTopicId1';
    dummyTopicId2 = 'dummyTopicId2';
  });

  it(`sends a GET request for the passed id to the uses API endpoint, processes the response and sets the user in the state`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
            gravatarHash: dummyGravatarHash,
          },
          relationships: {
            topics: {
              data: [
                { type: 'topics', id: dummyTopicId1 },
                { type: 'topics', id: dummyTopicId2 },
              ],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.users.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.users.get, dummyId, dummyToken)
      .put(actions.setMultipleInState([{ id: dummyId, email: dummyEmail, name: dummyName, gravatarHash: dummyGravatarHash, topicIds: [dummyTopicId1, dummyTopicId2] }]))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
            gravatarHash: dummyGravatarHash,
          },
          relationships: {
            topics: {
              data: [
                { type: 'topics', id: dummyTopicId1 },
                { type: 'topics', id: dummyTopicId2 },
              ],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.users.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_GET))
      .put(asyncRequests.actions.setSuccess(a.API_GET))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGet, dummyAction)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.users.get) throw dummyError;
          else return next();
        },
      })
      .put(asyncRequests.actions.setPending(a.API_GET))
      .put(asyncRequests.actions.setFailure(a.API_GET, dummyError))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when there is no currently signed in user`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
            gravatarHash: dummyGravatarHash,
          },
          relationships: {
            topics: {
              data: [
                { type: 'topics', id: dummyTopicId1 },
                { type: 'topics', id: dummyTopicId2 },
              ],
            },
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.users.get, dummyId, null), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_GET))
      .put(asyncRequests.actions.setSuccess(a.API_GET))
      .run();
  });

  it(`sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: null,
    };

    const result = await expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.users.get, dummyId, null), dummyApiResponse],
      ])
      .put(asyncRequests.actions.setPending(a.API_GET))
      .put.actionType(asyncRequests.actions.setFailure(a.API_GET, new UnexpectedHttpResponseError()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
