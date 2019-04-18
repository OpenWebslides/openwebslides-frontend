// @flow

import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyName: string;
  let dummyGravatarHash: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyAccessToken: string;
  let dummyTopicId1: string;
  let dummyTopicId2: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyGravatarHash = 'test';
    dummyLocale = 'en';
    dummyAlertEmails = true;
    dummyAccessToken = 'dummyAccessToken';
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
            locale: dummyLocale,
            alertEmails: dummyAlertEmails,
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
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', accessToken: dummyAccessToken }],
        [call(api.users.get, dummyId, dummyAccessToken), dummyApiResponse],
      ])
      .call(api.users.get, dummyId, dummyAccessToken)
      .put(actions.setMultipleInState([{ id: dummyId, email: dummyEmail, name: dummyName, gravatarHash: dummyGravatarHash, locale: dummyLocale, alertEmails: dummyAlertEmails, topicIds: [dummyTopicId1, dummyTopicId2] }]))
      .run();
  });

  it(`completes without errors, when there is no currently signed in user`, (): void => {
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
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: null,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.users.get, dummyId, null), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
