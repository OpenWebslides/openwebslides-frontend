// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyName: string;
  let dummyLocale: string;
  let dummyAlertEmails: boolean;
  let dummyCurrentPassword: string;
  let dummyPassword: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyName = 'dummyName';
    dummyLocale = 'dummyLocale';
    dummyAlertEmails = false;
    dummyCurrentPassword = 'dummyCurrentPassword';
    dummyPassword = 'dummyPassword';
    dummyToken = 'dummyToken';
  });

  it(`sends a PATCH request for the passed props to the users endpoint, and returns the resulting user ID`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.users.patch, dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyToken), dummyApiResponse],
      ])
      .call(api.users.patch, dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyToken)
      .returns({ id: dummyId })
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.users.patch, dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the request response doesn't contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword);
    const dummyApiResponse = { status: 200 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
          [call(api.users.patch, dummyId, dummyName, dummyLocale, dummyAlertEmails, dummyCurrentPassword, dummyPassword, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
