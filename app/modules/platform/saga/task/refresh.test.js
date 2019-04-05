// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { UnsupportedOperationError, Http401UnauthorizedError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`refresh`, (): void => {

  let dummyRefreshToken: string;
  let dummyAccessToken: string;

  beforeEach((): void => {
    dummyRefreshToken = 'dummyRefreshToken';
    dummyAccessToken = 'dummyAccessToken';
  });

  it(`selects the current user's refresh token from the state and puts an apiPatchToken action, while toggling the refreshing flag`, (): void => {
    const dummyAction = actions.refresh();

    return expectSaga(sagas.refresh, dummyAction)
      .provide([
        [select(selectors.getUserAuth), { userId: 'dummyId', refreshToken: dummyRefreshToken, accessToken: dummyAccessToken }],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH_TOKEN) ? null : next();
        })],
      ])
      .put(asyncRequests.actions.setRefreshingInState(true))
      .call(asyncRequests.lib.putAndReturn, actions.apiPatchToken(dummyRefreshToken))
      .put(asyncRequests.actions.setRefreshingInState(false))
      .run();
  });

  it(`selects the current user's refresh token from the state and puts an apiPatchToken action, while toggling the refreshing flag when apiPatchToken throws an error`, async (): Promise<void> => {
    const dummyAction = actions.refresh();
    const dummyError = new Http401UnauthorizedError();

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();

    await expect(
      expectSaga(sagas.refresh, dummyAction)
        .provide([
          [select(selectors.getUserAuth), { userId: 'dummyId', refreshToken: dummyRefreshToken, accessToken: dummyAccessToken }],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            if (action.type === a.API_PATCH_TOKEN) throw dummyError;

            return next();
          })],
        ])
        .put(asyncRequests.actions.setRefreshingInState(true))
        .call(asyncRequests.lib.putAndReturn, actions.apiPatchToken(dummyRefreshToken))
        .put(asyncRequests.actions.setRefreshingInState(false))
        .run(),
    ).rejects.toBeInstanceOf(Http401UnauthorizedError);
  });

  it(`throws an UnsupportedOperationError, when there is no user currently signed in`, async (): Promise<void> => {
    const dummyAction = actions.refresh();

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.refresh, dummyAction)
        .provide([
          [select(selectors.getUserAuth), null],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.API_PATCH_TOKEN) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
